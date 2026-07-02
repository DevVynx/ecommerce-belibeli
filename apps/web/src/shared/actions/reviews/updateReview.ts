"use server";

import type { UpdateReviewResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

type UpdateReviewParams = {
  rating?: number;
  comment?: string;
};

export async function updateReview(productId: string, params: UpdateReviewParams) {
  const { data, error } = await fetchClient<UpdateReviewResponse>(
    `/products/${productId}/reviews`,
    {
      isPrivate: true,
      method: "PATCH",
      body: params,
    }
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
