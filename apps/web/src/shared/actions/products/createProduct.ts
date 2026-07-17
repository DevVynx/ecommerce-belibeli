"use server";

import type { CreateProductRequest, CreateProductResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function createProduct(body: CreateProductRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<CreateProductResponse>("/admin/products", {
      isPrivate: true,
      method: "POST",
      body,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
