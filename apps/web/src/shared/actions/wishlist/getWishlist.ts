"use server";

import type { GetUserWishlistResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function getWishlist() {
  const { data, error } = await fetchClient<GetUserWishlistResponse>("/wishlist", {
    isPrivate: true,
  });

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
