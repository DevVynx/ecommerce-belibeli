import { findProductById } from "@/modules/products/services/findById";
import { findProductBySlug } from "@/modules/products/services/findBySlug";
import { findManyProducts } from "@/modules/products/services/findMany";
import { findVariantById } from "@/modules/products/services/findVariantById";
import { findVariantByIdWithProduct } from "@/modules/products/services/findVariantByIdWithProduct";

export const productServices = {
  findMany: findManyProducts,
  findById: findProductById,
  findBySlug: findProductBySlug,
  findVariantById: findVariantById,
  findVariantByIdWithProduct: findVariantByIdWithProduct,
};
