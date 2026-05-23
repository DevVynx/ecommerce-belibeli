import { findProductById } from "@/modules/products/repositories/findById";
import { findManyProducts } from "@/modules/products/repositories/findMany";
import { findVariantById } from "@/modules/products/repositories/findVariantById";
import { findVariantByIdWithProduct } from "@/modules/products/repositories/findVariantByIdWithProduct";

export const productRepositories = {
  findMany: findManyProducts,
  findById: findProductById,
  findVariantById: findVariantById,
  findVariantByIdWithProduct: findVariantByIdWithProduct,
};
