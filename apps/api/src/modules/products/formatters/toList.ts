import type { GetAllProductsResponse } from "@repo/types/contracts";

import type { EnrichedProductList } from "@/modules/products/types/enriched";

export function ProductFormmaterToList(products: EnrichedProductList[]): GetAllProductsResponse {
  const formattedProducts = products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      ratingRate: Number(product.ratingRate),
      ratingCount: Number(product.ratingCount),
      display: {
        price: Number(product.heroVariant.price),
        salePrice: Number(product.heroVariant.salePrice),
        isOnSale: product.heroVariant.isOnSale,
        variantId: product.heroVariant.id,
      },
    };
  });

  return { products: formattedProducts };
}
