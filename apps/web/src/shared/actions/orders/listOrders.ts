"use server";

import type { OrderDto } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function listOrders() {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<{ orders: OrderDto[] }>("/orders", {
      isPrivate: true,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
