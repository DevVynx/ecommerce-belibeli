import { db } from "@/shared/lib/db";

export const findById = async (id: string) => {
  return db.coupon.findUnique({ where: { id } });
};
