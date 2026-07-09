"use server";

import type { AddItemToWishlistRequest, AddItemToWishlistResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function addToWishlist(params: AddItemToWishlistRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<AddItemToWishlistResponse>("/wishlist/items", {
      isPrivate: true,
      method: "POST",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
