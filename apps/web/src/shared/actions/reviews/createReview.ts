"use server";

import type { CreateReviewResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

type CreateReviewParams = {
  rating: number;
  comment: string;
};

export async function createReview(productId: string, params: CreateReviewParams) {
  const { data, error } = await fetchClient<CreateReviewResponse>(
    `/products/${productId}/reviews`,
    {
      isPrivate: true,
      method: "POST",
      body: params,
    }
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
