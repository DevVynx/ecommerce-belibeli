"use server";

import type { QuoteShippingResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function quoteShipping(destinyCep: string) {
  const { data, error } = await fetchClient<QuoteShippingResponse>("/shipping/quote", {
    isPrivate: true,
    method: "POST",
    body: { destinyCep },
  });

  if (error) return { data: null, error };

  return { data, error: null };
}
