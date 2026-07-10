"use server";

import type { UpdateCouponRequest, UpdateCouponResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function updateCoupon(couponId: string, params: UpdateCouponRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<UpdateCouponResponse>(`/admin/coupons/${couponId}`, {
      isPrivate: true,
      method: "PATCH",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
