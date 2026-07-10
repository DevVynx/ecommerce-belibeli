import type { AdminSearchCouponsRequest } from "@repo/types/contracts";

import { couponRepositories } from "@/modules/coupon/repositories";

export const searchCoupons = async (params: AdminSearchCouponsRequest) => {
  const { q, isActive, sortBy, page = 1, limit = 20 } = params;

  const { coupons: raw, total } = await couponRepositories.searchCoupons({
    q,
    isActive,
    sortBy,
    page,
    limit,
  });

  const coupons = raw.map((c) => ({
    id: c.id,
    code: c.code,
    description: c.description,
    type: c.type,
    value: c.value,
    maxDiscount: c.maxDiscount ? Number(c.maxDiscount) : null,
    minOrderValue: Number(c.minOrderValue),
    startsAt: c.startsAt.toISOString(),
    endsAt: c.endsAt.toISOString(),
    usageLimit: c.usageLimit,
    usageCount: c._count.couponUsages,
    usageLimitPerUser: c.usageLimitPerUser,
    isActive: c.isActive,
  }));

  return {
    coupons,
    pagination: {
      total,
      page,
      totalPages: Math.ceil(total / limit),
    },
  };
};
