import type { GetCartResponse } from "@repo/types/contracts";

import type { EnrichedCart } from "@/modules/cart/types/Enriched";

import { toCartItemDto } from "./toCartItemDto";

export function toUserCart(cart: EnrichedCart | null): GetCartResponse {
  if (!cart) {
    return { cart: null };
  }

  const formattedItems = cart.items.map(toCartItemDto);

  return {
    cart: {
      id: cart.id,
      items: formattedItems,
      summary: {
        count: cart.summary.count,
        subtotal: Number(cart.summary.subtotal),
        total: Number(cart.summary.total),
        discount: Number(cart.summary.discount),
      },
    },
  };
}
