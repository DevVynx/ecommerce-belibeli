"use server";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function deleteReview(productId: string) {
  const { error } = await withAuthRefresh(() =>
    fetchClient(`/products/${productId}/reviews`, {
      isPrivate: true,
      method: "DELETE",
    })
  );

  if (error) return { data: null, error };

  return { data: null, error: null };
}
