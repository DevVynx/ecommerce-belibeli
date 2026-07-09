"use server";

import type { RemoveItemFromCartRequest, RemoveItemFromCartResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function removeItemFromCart(params: RemoveItemFromCartRequest) {
  const { error } = await withAuthRefresh(() =>
    fetchClient<RemoveItemFromCartResponse>(`/cart/items/${params.cartItemId}`, {
      isPrivate: true,
      method: "DELETE",
    })
  );

  if (error) return { data: null, error };

  return { data: null, error: null };
}
