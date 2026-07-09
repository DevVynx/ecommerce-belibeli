"use server";

import type { ApplyCouponRequest, ApplyCouponResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function validateCoupon(params: ApplyCouponRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<ApplyCouponResponse>("/coupons/validate", {
      isPrivate: true,
      method: "POST",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
