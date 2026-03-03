import { findProductById } from "@/modules/products/services/findById";
import { findManyProducts } from "@/modules/products/services/findMany";
import { findVariantById } from "@/modules/products/services/findVariantById";

export const productServices = {
  findMany: findManyProducts,
  findById: findProductById,
  findVariantById: findVariantById,
};
