import { ProductEnricher } from "@/modules/products/helpers/productEnricher";
import { productRepositories } from "@/modules/products/repositories";
import type { FindAllProductsParams } from "@/modules/products/types/ServicesParams";

export const findManyProducts = async ({
  categoryId,
  limit,
  offset,
  onlyAvailable,
}: FindAllProductsParams) => {
  const rawProducts = await productRepositories.findMany({
    categoryId,
    limit,
    offset,
    onlyAvailable,
  });

  const enrichedProducts = ProductEnricher.enrichMany(rawProducts);

  return { products: enrichedProducts };
};
