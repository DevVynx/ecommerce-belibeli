import { db } from "@/shared/lib/db";
import type { FindAllProductsParams } from "@/modules/products/types/ServicesParams";
import { controllerProductListMapper } from "@/modules/products/mappers";

export const findAll = async ({
  categoryId,
  limit,
  offset,
}: FindAllProductsParams) => {
  const whereClause =
    categoryId !== undefined ? { categoryId: categoryId } : {};

  const rawProducts = await db.product.findMany({
    where: whereClause,
    include: {
      category: { select: { id: true, name: true } },
      productOptions: {
        include: { values: { select: { id: true, value: true } } },
        omit: { productId: true },
      },
    },
    omit: { categoryId: true, createdAt: true, updatedAt: true },
    skip: offset,
    take: limit,
  });

  const products = controllerProductListMapper(rawProducts);

  const count = await db.product.count({
    where: whereClause,
  });

  return { products, count };
};
