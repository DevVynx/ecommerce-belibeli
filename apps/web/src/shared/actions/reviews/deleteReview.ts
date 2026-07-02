"use server";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function deleteReview(productId: string) {
  const { error } = await fetchClient(`/products/${productId}/reviews`, {
    isPrivate: true,
    method: "DELETE",
  });

  if (error) return { data: null, error };

  return { data: null, error: null };
}
