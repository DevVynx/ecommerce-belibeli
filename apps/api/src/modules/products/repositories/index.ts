import { findProductById } from "@/modules/products/repositories/findById";
import { findManyProducts } from "@/modules/products/repositories/findMany";
import { findVariantById } from "@/modules/products/repositories/findVariantById";

export const productRepositories = {
  findMany: findManyProducts,
  findById: findProductById,
  findVariantById: findVariantById,
};
