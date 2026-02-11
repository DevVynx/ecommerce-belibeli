import { calculateSalePrice } from "@/modules/products/core/calculateSalePrice";
import { ProductFormmater } from "@/modules/products/formatters";
import type { FindAllProductsParams } from "@/modules/products/types/ServicesParams";
import { db } from "@/shared/lib/db";

import { Prisma } from "../../../../prisma/generated/client/client";

export const findAll = async ({ categoryId, limit = 20, offset = 0 }: FindAllProductsParams) => {
  const whereClause: Prisma.ProductWhereInput = {
    ...(categoryId && { categoryId }),
  };

  const now = new Date();

  const rawProducts = await db.product.findMany({
    where: whereClause,
    include: {
      category: {
        include: {
          promotions: {
            where: {
              isActive: true,
              startsAt: { lte: now },
              endsAt: { gte: now },
            },
          },
        },
      },
      promotions: { where: { isActive: true, startsAt: { lte: now }, endsAt: { gte: now } } },
      productOptions: {
        include: { values: true },
      },
      productVariants: {
        include: {
          promotions: { where: { isActive: true, startsAt: { lte: now }, endsAt: { gte: now } } },
          productVariantOptions: {
            select: { productOptionValueId: true },
          },
        },
      },
    },
    skip: offset,
    take: limit,
  });

  const productsWithCalculatedData = rawProducts.map((product) => {
    const variantsWithPrices = product.productVariants.map((variant) => {
      const salePrice = calculateSalePrice(
        variant.price,
        variant.promotions,
        product.promotions,
        product.category.promotions
      );

      const isAvailable = variant.stock > 0 && variant.isActive;

      return {
        ...variant,
        salePrice,
        isAvailable,
      };
    });
    return {
      ...product,
      variants: variantsWithPrices,
    };
  });

  const { products } = ProductFormmater.toList(productsWithCalculatedData);

  return { products };
};
