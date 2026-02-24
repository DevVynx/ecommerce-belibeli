import type { GetAllProductsResponse } from "@repo/types/contracts";

import type { EnrichedProductList } from "@/modules/products/types/enriched";

export function ProductMapperToCatalogSummary(
  products: EnrichedProductList
): GetAllProductsResponse {
  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      ratingRate: Number(product.ratingRate),
      ratingCount: Number(product.ratingCount),
      display: {
        variantId: product.heroVariant.id,
        image: product.image,
        price: Number(product.heroVariant.price),
        salePrice: Number(product.heroVariant.salePrice),
        isOnSale: product.heroVariant.isOnSale,
        isAvailable: product.heroVariant.isAvailable,
      },
    };
  });

  return { products: formattedProducts };
}
