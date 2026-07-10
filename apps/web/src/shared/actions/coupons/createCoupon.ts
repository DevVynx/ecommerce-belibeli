"use server";

import type { CreateCouponRequest, CreateCouponResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function createCoupon(params: CreateCouponRequest) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<CreateCouponResponse>("/coupons", {
      isPrivate: true,
      method: "POST",
      body: params,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
