import type { GetAllProductsResponse } from "@repo/types/contracts";

import type { EnrichedProductList } from "@/modules/products/types/enriched";

export function ProductFormmaterToList(rawProducts: EnrichedProductList[]): GetAllProductsResponse {
  const formattedProducts = rawProducts.map((product) => {
    const formattedProductsVariants = product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      price: Number(variant.price),
      salePrice: Number(variant.salePrice),
      isAvailable: variant.isAvailable,
      optionValueIds: variant.productVariantOptions.map((option) => option.productOptionValueId),
    }));

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      ratingRate: Number(product.ratingRate),
      ratingCount: Number(product.ratingCount),
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      productOptions: product.productOptions.map((option) => ({
        id: option.id,
        name: option.name,
        values: option.values.map((value) => ({
          id: value.id,
          value: value.value,
        })),
      })),
      variants: formattedProductsVariants,
    };
  });

  return { products: formattedProducts };
}
