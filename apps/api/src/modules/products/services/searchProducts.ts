import { searchEngine } from "@/infra/search";
import { productRepositories } from "@/modules/products/repositories";
import type {
  EnrichedProductList,
  EnrichedProductListItem,
} from "@/modules/products/types/ProductList";
import type { SearchProductsParams } from "@/modules/products/types/ServiceParams";
import { productLogic } from "@/shared/utils/productLogic";

export const searchProducts = async ({
  q,
  categoryId,
  minPrice,
  maxPrice,
  sortBy,
  offset,
  limit,
}: SearchProductsParams) => {
  const filters: string[] = [];

  if (categoryId) filters.push(`categoryId = "${categoryId}"`);
  if (minPrice != null) filters.push(`salePrice >= ${minPrice}`);
  if (maxPrice != null) filters.push(`salePrice <= ${maxPrice}`);

  const sortMap: Record<string, string> = {
    price_asc: "salePrice:asc",
    price_desc: "salePrice:desc",
    rating_desc: "ratingRate:desc",
    newest: "createdAt:desc",
  };

  const searchResult = await searchEngine.search("products", {
    query: q ?? "",
    filters: filters.length > 0 ? filters : undefined,
    sort: sortBy ? [sortMap[sortBy]!] : undefined,
    limit,
    offset,
  });

  const totalHits = searchResult.totalHits;
  const ids = searchResult.hits.map((hit) => String(hit.id));

  if (ids.length === 0) {
    return {
      enrichedProducts: [] as EnrichedProductList,
      pagination: { total: totalHits, hasMore: false },
    };
  }

  const rawProducts = await productRepositories.findByIds(ids);

  const productMap = new Map(rawProducts.map((p) => [p.id, p]));
  const enrichedProducts: EnrichedProductListItem[] = [];

  for (const id of ids) {
    const product = productMap.get(id);
    if (!product) continue;

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
    } as EnrichedProductListItem);
  }

  return {
    enrichedProducts,
    pagination: {
      total: totalHits,
      hasMore: offset + limit < totalHits,
    },
  };
};
