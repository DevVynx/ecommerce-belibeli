import { CartItemDto } from "@repo/types/contracts";

import type { EnrichedCartItem } from "@/modules/cart/types/Enriched";

export function toCartItemDto(item: EnrichedCartItem): CartItemDto {
  const { product } = item;
  const { variant } = product;

  return {
    id: item.id,
    quantity: item.quantity,
    product: {
      id: product.id,
      title: product.title,
      variant: {
        id: variant.id,
        image: product.image,
        price: Number(variant.price),
        salePrice: Number(variant.salePrice),
        isOnSale: variant.isOnSale,
        isAvailable: variant.isAvailable,
      },
    },
    selectedOptions: variant.productVariantOptions.map((pvo) => ({
      name: pvo.productOptionValue.productOption.name,
      value: pvo.productOptionValue.value,
    })),
  };
}
