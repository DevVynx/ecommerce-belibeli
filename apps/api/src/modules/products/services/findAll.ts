import { ProductFormmater } from "@/modules/products/helpers/formatters";
import { ProductEnricher } from "@/modules/products/helpers/productEnricher";
import type { FindAllProductsParams } from "@/modules/products/types/ServicesParams";
import { db } from "@/shared/lib/db";

import { Prisma } from "../../../../prisma/generated/client/client";

export const findAll = async ({ categoryId, limit = 10, offset = 0 }: FindAllProductsParams) => {
  const whereClause: Prisma.ProductWhereInput = {
    ...(categoryId && { categoryId }),
    productVariants: { some: { isActive: true, stock: { gt: 0 } } },
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
      promotions: {
        where: { isActive: true, startsAt: { lte: now }, endsAt: { gte: now } },
      },
      productVariants: {
        select: {
          id: true,
          price: true,
          stock: true,
          isActive: true,
          promotions: {
            where: { isActive: true, startsAt: { lte: now }, endsAt: { gte: now } },
          },
        },
      },
    },
    skip: offset,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const productsWithCalculatedData = ProductEnricher.enrichList(rawProducts);

  const { products } = ProductFormmater.toList(productsWithCalculatedData);

  return { products };
};
