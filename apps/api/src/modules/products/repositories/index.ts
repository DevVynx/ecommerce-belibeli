import { findProductById } from "@/modules/products/repositories/findById";
import { findManyProducts } from "@/modules/products/repositories/findMany";

export const productRepositories = {
  findMany: findManyProducts,
  findById: findProductById,
};
