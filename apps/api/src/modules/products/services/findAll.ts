import { controllerProductListMapper } from "@/modules/products/mappers";
import type { FindAllProductsParams } from "@/modules/products/types/ServicesParams";
import { db } from "@/shared/lib/db";

import { Prisma } from "../../../../prisma/generated/client/client";

export const findAll = async ({ categoryId, limit = 20, offset = 0 }: FindAllProductsParams) => {
  const whereClause: Prisma.ProductWhereInput = {
    productVariants: {
      some: {
        isActive: true,
        stock: { gt: 0 },
      },
    },
    ...(categoryId && { categoryId }),
  };

  const rawProducts = await db.product.findMany({
    where: whereClause,
    include: {
      category: {
        include: {
          promotions: { where: { isActive: true } },
        },
      },
      promotions: { where: { isActive: true } },
      productOptions: {
        include: { values: true },
      },
      productVariants: {
        where: {
          isActive: true,
          stock: { gt: 0 },
        },
        include: {
          promotions: { where: { isActive: true } },
          productVariantOptions: {
            select: { productOptionValueId: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });

  const products = controllerProductListMapper(rawProducts);

  return { products };
};
