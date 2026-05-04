"use server";

import type { GetProductDetailsResponse } from "@repo/types/contracts";
import { cacheLife, cacheTag } from "next/cache";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function getProductById(productId: string) {
  "use cache";

  cacheLife("seconds");

  cacheTag("product");

  const { data, error } = await fetchClient<GetProductDetailsResponse>(`/products/${productId}`);

  if (error) return { data: null, error };

  return { data, error: null };
}
