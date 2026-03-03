import { GetCartItemsResponse } from "@repo/types/contracts";

import type { EnrichedCartItem } from "@/modules/cart/types/Enriched";

import { toCartItemDto } from "./toCartItemDto";

export function toGetCartItems(
  items: EnrichedCartItem[] | null
): Pick<GetCartItemsResponse, "items"> {
  if (!items) {
    return { items: null };
  }

  const formmatedItems = items.map(toCartItemDto);

  return {
    items: formmatedItems,
  };
}
