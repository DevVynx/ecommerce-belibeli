import { CartItemDto } from "@repo/types/contracts";

import type { EnrichedCartItem } from "@/modules/cart/types/Cart";

export function toCartItemDto(item: EnrichedCartItem): CartItemDto {
  const { product } = item;
  const { variant } = product;

  return {
    id: item.id,
    quantity: item.quantity,
    product: {
      id: product.id,
      slug: product.slug,
      title: product.title,
      variant: {
        id: variant.id,
        image: variant.images[0]?.url ?? "",
        price: Number(variant.price),
        stock: variant.stock,
        salePrice: Number(variant.offer.salePrice),
        isOnSale: variant.offer.isOnSale,
        isAvailable: variant.offer.isAvailable,
      },
    },
    selectedOptions: variant.optionValues.map((pvo) => ({
      name: pvo.productOptionValue.productOption.name,
      value: pvo.productOptionValue.value,
    })),
  };
}
