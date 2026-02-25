import type { FindProductByIdParams } from "@/modules/products/types/ServicesParams";
import { db } from "@/shared/lib/db";

export const findProductById = async ({ productId }: FindProductByIdParams) => {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  return product;
};
