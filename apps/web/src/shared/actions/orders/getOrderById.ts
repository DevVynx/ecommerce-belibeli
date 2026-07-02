"use server";

import type { GetOrderByIdResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function getOrderById(orderId: string) {
  const { data, error } = await fetchClient<GetOrderByIdResponse>(`/orders/${orderId}`, {
    isPrivate: true,
  });

  if (error) return { data: null, error };

  return { data, error: null };
}
