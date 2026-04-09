"use server";

import type { GetProductsResponse } from "@repo/types/contracts";
import { cacheLife, cacheTag } from "next/cache";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function getProducts() {
  "use cache";

  cacheLife("seconds");

  cacheTag("products");

  const { data, error } = await fetchClient<GetProductsResponse>("/products");

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
