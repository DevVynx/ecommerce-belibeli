import { db } from "@/shared/lib/db";
import { productLogic } from "@/shared/utils/productLogic";

import type { Prisma } from "../../../../prisma/generated/client/client";
import { productRepositories } from "../repositories";
import type { EnrichedProductList, EnrichedProductListItem } from "../types/ProductList";
import type { SearchProductsParams } from "../types/ServiceParams";

const now = () => new Date();
const promo = () => ({ isActive: true, startsAt: { lte: now() }, endsAt: { gte: now() } });

function buildProductInclude() {
  return {
    category: { select: { promotions: { where: promo() } } },
    promotions: { where: promo() },
    productVariants: {
      where: { isActive: true, stock: { gt: 0 } },
      select: {
        id: true,
        price: true,
        stock: true,
        isActive: true,
        promotions: { where: promo() },
      },
    },
  } satisfies Prisma.ProductInclude;
}

type RawProduct = Prisma.ProductGetPayload<{ include: ReturnType<typeof buildProductInclude> }>;

export const searchProducts = async ({
  q,
  categoryId,
  onSale,
  minRating,
  optionValues,
  sortBy,
  offset,
  limit,
}: SearchProductsParams) => {
  const andConditions: Prisma.ProductWhereInput[] = [];

  andConditions.push({
    productVariants: { some: { isActive: true, stock: { gt: 0 } } },
  });

  if (q) {
    andConditions.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    });
  }

  if (categoryId) {
    andConditions.push({ categoryId });
  }

  if (onSale === true) {
    andConditions.push({
      OR: [
        { promotions: { some: promo() } },
        { category: { promotions: { some: promo() } } },
        { productVariants: { some: { promotions: { some: promo() } } } },
      ],
    });
  } else if (onSale === false) {
    andConditions.push({
      NOT: {
        OR: [
          { promotions: { some: promo() } },
          { category: { promotions: { some: promo() } } },
          { productVariants: { some: { promotions: { some: promo() } } } },
        ],
      },
    });
  }

  if (minRating != null) {
    andConditions.push({ ratingRate: { gte: minRating } });
  }

  if (optionValues) {
    const { productIds } = await productRepositories.findProductIdsByOptionValues(
      optionValues.split(",")
    );
    if (productIds.length === 0) {
      return emptyResponse();
    }
    andConditions.push({ id: { in: productIds } });
  }

  const where =
    andConditions.length === 0
      ? {}
      : andConditions.length === 1
        ? andConditions[0]!
        : { AND: andConditions };

  const total = await db.product.count({ where });

  if (total === 0) {
    return emptyResponse();
  }

  if (sortBy?.startsWith("price_")) {
    return searchWithPriceSort(where, sortBy, offset, limit, total);
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput[] =
    sortBy === "newest"
      ? [{ createdAt: "desc" }, { id: "asc" }]
      : sortBy === "rating_desc"
        ? [{ ratingRate: "desc" }, { id: "asc" }]
        : [{ createdAt: "desc" }, { id: "asc" }];

  const productInclude = buildProductInclude();

  const rawProducts = await db.product.findMany({
    where,
    orderBy,
    skip: offset,
    take: limit,
    include: productInclude,
  });

  const enrichedProducts = enrichResults(rawProducts);
  const filters = await buildFilters(where);

  return {
    enrichedProducts,
    pagination: { total, hasMore: offset + limit < total },
    filters,
  };
};

function enrichResults(rawProducts: RawProduct[]) {
  const enrichedProducts: EnrichedProductListItem[] = [];

  for (const product of rawProducts) {
    const variantsWithEnrichment = product.productVariants.map((variant) => {
      const offer = productLogic.calculateEnrichment(variant, {
        variant: variant.promotions,
        product: product.promotions,
        category: product.category.promotions,
      });
      return { ...variant, offer };
    });

    const heroVariant = productLogic.pickHeroVariant(variantsWithEnrichment);
    if (!heroVariant) continue;

    enrichedProducts.push({
      ...product,
      productVariants: variantsWithEnrichment,
      heroVariant,
    } as unknown as EnrichedProductListItem);
  }

  return enrichedProducts;
}

// In-memory sort: fetches all matching products to compute effective sale price per product,
// then sorts in-memory. Alternative: materialized `minPrice` column on Product table.
async function searchWithPriceSort(
  where: Prisma.ProductWhereInput,
  sortBy: string,
  offset: number,
  limit: number,
  total: number
) {
  const allProducts = await db.product.findMany({
    where,
    select: {
      id: true,
      promotions: { where: promo(), select: { type: true, discountValue: true } },
      category: {
        select: {
          promotions: { where: promo(), select: { type: true, discountValue: true } },
        },
      },
      productVariants: {
        where: { isActive: true, stock: { gt: 0 } },
        select: {
          price: true,
          promotions: { where: promo(), select: { type: true, discountValue: true } },
        },
      },
    },
  });

  const withMinPrice = allProducts.map((p) => {
    let minSale = Infinity;
    for (const v of p.productVariants) {
      const { salePrice } = productLogic.calculateEnrichment(
        { price: v.price, stock: 0, isActive: true },
        {
          variant: v.promotions,
          product: p.promotions,
          category: p.category.promotions,
        }
      );
      minSale = Math.min(minSale, Number(salePrice));
    }
    return { id: p.id, minPrice: minSale };
  });

  withMinPrice.sort((a, b) => {
    const diff = sortBy === "price_asc" ? a.minPrice - b.minPrice : b.minPrice - a.minPrice;
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  });

  const sortedIds = withMinPrice.slice(offset, offset + limit).map((p) => p.id);

  if (sortedIds.length === 0) {
    return emptyResponse();
  }

  const productInclude = buildProductInclude();

  const rawProducts = await db.product.findMany({
    where: { id: { in: sortedIds } },
    include: productInclude,
  });

  const orderMap = new Map(rawProducts.map((p) => [p.id, p]));
  const ordered = sortedIds.map((id) => orderMap.get(id)).filter(Boolean) as typeof rawProducts;

  const enrichedProducts = enrichResults(ordered);
  const filters = await buildFilters(where);

  return {
    enrichedProducts,
    pagination: { total, hasMore: offset + limit < total },
    filters,
  };
}

async function buildFilters(searchWhere: Prisma.ProductWhereInput) {
  const filteredProducts = { some: searchWhere };

  const [categories, optionValues, has4Stars, has5Stars] = await Promise.all([
    db.category.findMany({
      where: { products: filteredProducts },
      select: { id: true, name: true },
    }),
    db.productOptionValue.findMany({
      where: {
        productVariantOptions: {
          some: {
            productVariant: {
              isActive: true,
              stock: { gt: 0 },
              product: searchWhere,
            },
          },
        },
      },
      select: {
        value: true,
        productOption: { select: { name: true } },
      },
    }),
    db.product.findFirst({
      where: { ...searchWhere, ratingRate: { gte: 4 } },
      select: { id: true },
    }),
    db.product.findFirst({
      where: { ...searchWhere, ratingRate: { gte: 5 } },
      select: { id: true },
    }),
  ]);

  const grouped = new Map<string, Set<string>>();
  for (const ov of optionValues) {
    const name = ov.productOption.name;
    if (!grouped.has(name)) grouped.set(name, new Set());
    grouped.get(name)!.add(ov.value);
  }

  const options = Array.from(grouped.entries()).map(([name, values]) => ({
    id: name,
    name,
    values: Array.from(values).map((value) => ({ value })),
  }));

  const ratingOptions: { value: number }[] = [];
  if (has4Stars) ratingOptions.push({ value: 4 });
  if (has5Stars) ratingOptions.push({ value: 5 });

  return {
    categories,
    ratingOptions,
    options,
  };
}

function emptyResponse() {
  return {
    enrichedProducts: [] as EnrichedProductList,
    pagination: { total: 0, hasMore: false },
    filters: { categories: [], ratingOptions: [], options: [] },
  };
}
