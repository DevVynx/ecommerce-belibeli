import { productRepositories } from "@/modules/products/repositories";
import type { FindProductByIdParams } from "@/modules/products/types/ServicesParams";

export const findProductById = async ({ productId }: FindProductByIdParams) => {
  const product = await productRepositories.findById({ productId });

  return product;
};
