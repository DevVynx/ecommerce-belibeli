"use server";

import type { UpdatePromotionRequest, UpdatePromotionResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function updatePromotion(promotionId: string, params: UpdatePromotionRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<UpdatePromotionResponse>(`/admin/promotions/${promotionId}`, {
      isPrivate: true,
      method: "PATCH",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
