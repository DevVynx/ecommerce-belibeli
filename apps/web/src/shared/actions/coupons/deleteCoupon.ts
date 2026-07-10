"use server";

import type { DeleteCouponResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function deleteCoupon(couponId: string) {
  const { error } = await withAuthRefresh(() =>
    fetchClient<DeleteCouponResponse>(`/admin/coupons/${couponId}`, {
      isPrivate: true,
      method: "DELETE",
    })
  );

  if (error) return { data: null, error };

  return { data: null, error: null };
}
