"use server";

import type { DeletePromotionResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function deletePromotion(promotionId: string) {
  const { error } = await withAuthRefresh(() =>
    fetchClient<DeletePromotionResponse>(`/admin/promotions/${promotionId}`, {
      isPrivate: true,
      method: "DELETE",
    })
  );

  if (error) return { data: null, error };

  return { data: null, error: null };
}
