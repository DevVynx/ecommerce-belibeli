"use server";

import type { AddItemToWishlistResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function addToWishlist(productId: string) {
  const { data, error } = await fetchClient<AddItemToWishlistResponse>("/wishlist/items", {
    isPrivate: true,
    method: "POST",
    body: { productId },
  });

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
