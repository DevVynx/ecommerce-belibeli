import type { ProductInclude } from "@/app/shared/types/Product";
import API from "./API";

type Products = { products: ProductInclude[]; count: number };

async function getProducts() {
  const response = await API.get<Products>("/product");
  return response.data;
}

export const productService = { getProducts };
