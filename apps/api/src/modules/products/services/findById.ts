import { findProductById } from "@/modules/products/repositories/findProductById";
import type { FindProductByIdParams } from "@/modules/products/types/ServicesParams";

export const findById = async ({ productId }: FindProductByIdParams) => {
  const product = await findProductById({ productId });

  return product;
};
