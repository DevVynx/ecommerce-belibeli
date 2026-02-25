import { findManyProducts } from "@/modules/products/services/findMany";
import { findProductById } from "@/modules/products/services/findById";

export const productServices = {
  findMany: findManyProducts,
  findById: findProductById,
};
