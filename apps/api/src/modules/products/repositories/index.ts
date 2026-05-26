import { findProductById } from "@/modules/products/repositories/findById";
import { findProductBySlug } from "@/modules/products/repositories/findBySlug";
import { findManyProducts } from "@/modules/products/repositories/findMany";
import { findVariantById } from "@/modules/products/repositories/findVariantById";
import { findVariantByIdWithProduct } from "@/modules/products/repositories/findVariantByIdWithProduct";

export const productRepositories = {
  findMany: findManyProducts,
  findById: findProductById,
  findBySlug: findProductBySlug,
  findVariantById: findVariantById,
  findVariantByIdWithProduct: findVariantByIdWithProduct,
};
