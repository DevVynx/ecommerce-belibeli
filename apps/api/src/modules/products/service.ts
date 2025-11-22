import { db } from "../../shared/lib/db";
import { FindAllProducts } from "@repo/types/contracts";

const findAll = async ({ categoryId, limit, offset }: FindAllProducts) => {
  const whereClause = categoryId !== undefined ? { categoryId: categoryId } : {};

  const products = await db.product.findMany({
    where: whereClause,
    include: {
      category: { select: { name: true } },
      productOption: { include: { values: true } },
    },
    skip: offset,
    take: limit,
  });

  const count = await db.product.count({
    where: whereClause,
  });

  return { products, count };
};

export const productService = { findAll };
