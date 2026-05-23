"use server";

import type { SyncCartRequest, SyncCartResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function syncCart(params: SyncCartRequest) {
  const { data, error } = await fetchClient<SyncCartResponse>("/cart/sync", {
    isPrivate: true,
    method: "POST",
    body: params,
  });

  if (error) return { data: null, error };

  return { data, error: null };
}
