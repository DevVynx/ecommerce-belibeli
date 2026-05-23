import { productRepositories } from "@/modules/products/repositories";
import type { findVariantByIdWithProductParams } from "@/modules/products/types/ServiceParams";

export const findVariantByIdWithProduct = async ({
  variantId,
}: findVariantByIdWithProductParams) => {
  const variant = await productRepositories.findVariantByIdWithProduct({ variantId });
  return { variant };
};
