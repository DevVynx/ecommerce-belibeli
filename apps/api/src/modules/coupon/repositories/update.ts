import { db } from "@/shared/lib/db";

import type { UpdateCouponData } from "../types/ServiceParams";

export const update = async (id: string, data: UpdateCouponData) => {
  const parsed: Record<string, unknown> = {};

  if (data.code !== undefined) parsed.code = data.code;
  if (data.description !== undefined) parsed.description = data.description;
  if (data.type !== undefined) parsed.type = data.type;
  if (data.value !== undefined) parsed.value = data.value;
  if (data.maxDiscount !== undefined) parsed.maxDiscount = data.maxDiscount;
  if (data.minOrderValue !== undefined) parsed.minOrderValue = data.minOrderValue;
  if (data.startsAt !== undefined) parsed.startsAt = new Date(data.startsAt);
  if (data.endsAt !== undefined) parsed.endsAt = new Date(data.endsAt);
  if (data.usageLimit !== undefined) parsed.usageLimit = data.usageLimit;
  if (data.usageLimitPerUser !== undefined) parsed.usageLimitPerUser = data.usageLimitPerUser;
  if (data.isActive !== undefined) parsed.isActive = data.isActive;

  return db.coupon.update({ where: { id }, data: parsed });
};
