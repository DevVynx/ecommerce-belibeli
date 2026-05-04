"use server";

import type { AddItemToWishlistRequest, AddItemToWishlistResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function addToWishlist(params: AddItemToWishlistRequest) {
  const { data, error } = await fetchClient<AddItemToWishlistResponse>("/wishlist/items", {
    isPrivate: true,
    method: "POST",
    body: params,
  });

  if (error) return { data: null, error };

  return { data, error: null };
}
