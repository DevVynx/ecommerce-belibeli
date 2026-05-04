"use server";

import type {
  RemoveItemFromWishlistRequest,
  RemoveWishlistItemResponse,
} from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function removeFromWishlist(params: RemoveItemFromWishlistRequest) {
  const { data, error } = await fetchClient<RemoveWishlistItemResponse>(
    `/wishlist/items/${params.productId}`,
    {
      isPrivate: true,
      method: "DELETE",
    }
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
