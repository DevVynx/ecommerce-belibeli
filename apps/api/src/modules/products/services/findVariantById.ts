import { productRepositories } from "@/modules/products/repositories";

export const findVariantById = async (variantId: string) => {
  const variant = await productRepositories.findVariantById(variantId);

  return variant;
};
