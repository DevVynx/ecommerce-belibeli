export type PromotionType = "PERCENTAGE" | "FIXED";

export type PromotionTargetType = "category" | "product" | "variant";

export type AdminSearchPromotionsRequest = {
  q?: string;
  isActive?: boolean;
  type?: PromotionType;
  targetType?: PromotionTargetType;
  sortBy?: "newest" | "oldest" | "expiring_soon" | "discount_desc" | "discount_asc";
  page?: number;
  limit?: number;
};
