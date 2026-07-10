import { db } from "@/shared/lib/db";

export const deleteCoupon = async (id: string) => {
  await db.coupon.delete({ where: { id } });
};
