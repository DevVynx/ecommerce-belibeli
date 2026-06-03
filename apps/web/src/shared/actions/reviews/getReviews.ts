"use server";
import type { GetReviewsRequest } from "@repo/types/contracts";
import { cacheTag } from "next/cache";
import { cacheLife } from "next/cache";

import { mockReviews } from "@/shared/components/Store/ProductDetails/mockedReviews";

export async function getReviews(params: GetReviewsRequest) {
  "use cache";
  cacheLife("hours");
  cacheTag("reviews");

  const offset = params.offset ?? 0;
  const limit = params.limit ?? 10;
  const sort = params.sort ?? "newest";

  let filtered = [...mockReviews];

  if (params.rating) {
    filtered = filtered.filter((r) => r.rating === params.rating);
  }

  if (sort === "relevant") {
    filtered.sort(() => Math.random() - 0.5);
  }

  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);
  const hasMore = offset + limit < total;

  return { reviews: paginated, total, hasMore };
}
