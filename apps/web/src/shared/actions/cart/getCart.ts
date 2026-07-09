"use server";

import type { GetCartResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function getCart() {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<GetCartResponse>("/cart", {
      isPrivate: true,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
