"use server";

import type { RemoveWishlistItemResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function removeFromWishlist(productId: string) {
  const { data, error } = await fetchClient<RemoveWishlistItemResponse>(`/wishlist/items/${productId}`, {
    isPrivate: true,
    method: "DELETE",
  });

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}