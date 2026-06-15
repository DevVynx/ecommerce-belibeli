"use server";

import type { GetReviewsRequest, GetReviewsResponse } from "@repo/types/contracts";
import { cacheLife, cacheTag } from "next/cache";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function getReviews(params: GetReviewsRequest) {
  "use cache";
  cacheLife("hours");
  cacheTag("reviews");

  const queryParams: Record<string, string | number> = {};

  if (params.offset !== undefined) queryParams.offset = params.offset;
  if (params.limit !== undefined) queryParams.limit = params.limit;
  if (params.rating !== undefined) queryParams.rating = params.rating;
  if (params.sort) queryParams.sort = params.sort;

  const { data, error } = await fetchClient<GetReviewsResponse>(
    `/products/${params.productId}/reviews`,
    { params: queryParams }
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
