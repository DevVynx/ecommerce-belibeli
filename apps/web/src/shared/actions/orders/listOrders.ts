"use server";

import type { OrderDto } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function listOrders() {
  const { data, error } = await fetchClient<{ orders: OrderDto[] }>("/orders", {
    isPrivate: true,
  });

  if (error) return { data: null, error };

  return { data, error: null };
}
