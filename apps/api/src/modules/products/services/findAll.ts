import { ProductEnricher } from "@/modules/products/helpers/productEnricher";
import { productRepositories } from "@/modules/products/repositories";
import type { FindAllProductsParams } from "@/modules/products/types/ServicesParams";

export const findAll = async ({
  categoryId,
  limit,
  offset,
  onlyAvailable,
}: FindAllProductsParams) => {
  const rawProducts = await productRepositories.findAll({
    categoryId,
    limit,
    offset,
    onlyAvailable,
  });

  const enrichedProducts = ProductEnricher.enrichMany(rawProducts);

  return { products: enrichedProducts };
};
