export type CouponType = "PERCENTAGE" | "FIXED" | "FREE_SHIPPING";

export type ApplyCouponRequest = {
  code: string;
};

export type CreateCouponRequest = {
  code: string;
  type: CouponType;
  startsAt: string;
  endsAt: string;
  usageLimit: number;
  description?: string;
  value?: number;
  maxDiscount?: number;
  minOrderValue?: number;
  usageLimitPerUser?: number;
  isActive?: boolean;
};

export type AdminSearchCouponsRequest = {
  q?: string;
  isActive?: boolean;
  sortBy?: "newest" | "oldest" | "expiring_soon" | "usage_desc" | "usage_asc";
  page?: number;
  limit?: number;
};

export type UpdateCouponRequest = Partial<{
  code: string;
  type: CouponType;
  description: string;
  value: number;
  maxDiscount: number | null;
  minOrderValue: number;
  startsAt: string;
  endsAt: string;
  usageLimit: number;
  usageLimitPerUser: number;
  isActive: boolean;
}>;
