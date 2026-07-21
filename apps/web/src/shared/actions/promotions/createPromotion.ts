"use server";

import type { CreatePromotionRequest, CreatePromotionResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function createPromotion(params: CreatePromotionRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<CreatePromotionResponse>("/admin/promotions", {
      isPrivate: true,
      method: "POST",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
