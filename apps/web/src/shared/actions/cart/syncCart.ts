"use server";

import type { SyncCartRequest, SyncCartResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function syncCart(params: SyncCartRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<SyncCartResponse>("/cart/sync", {
      isPrivate: true,
      method: "POST",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
