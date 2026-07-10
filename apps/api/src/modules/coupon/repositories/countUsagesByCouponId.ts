import { db } from "@/shared/lib/db";

export const countUsagesByCouponId = async (couponId: string) => {
  return db.couponUsage.count({ where: { couponId } });
};
