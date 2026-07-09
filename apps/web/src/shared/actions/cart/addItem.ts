"use server";

import type { AddItemToCartRequest, AddItemToCartResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function addItemToCart(params: AddItemToCartRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<AddItemToCartResponse>("/cart/items", {
      isPrivate: true,
      method: "POST",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
