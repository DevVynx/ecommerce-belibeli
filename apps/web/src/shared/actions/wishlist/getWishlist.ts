"use server";

import type { GetUserWishlistResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function getWishlist() {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<GetUserWishlistResponse>("/wishlist", {
      isPrivate: true,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
