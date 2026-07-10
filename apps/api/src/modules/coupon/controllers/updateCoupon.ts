import type { UpdateCouponResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { couponServices } from "@/modules/coupon/services";
import v from "@/modules/coupon/validators";

export const updateCoupon: RequestHandler = async (req, res: Response<UpdateCouponResponse>) => {
  const { id } = v.updateCoupon.getValidatedValues(req).params;
  const data = v.updateCoupon.getValidatedValues(req).body;

  const { coupon } = await couponServices.updateCoupon(id, data);

  return res.json({
    coupon: {
      id: coupon.id,
      code: coupon.code,
      description: coupon.description,
      type: coupon.type,
      value: coupon.value,
      maxDiscount: coupon.maxDiscount ? Number(coupon.maxDiscount) : null,
      minOrderValue: Number(coupon.minOrderValue),
      startsAt: coupon.startsAt,
      endsAt: coupon.endsAt,
      usageLimit: coupon.usageLimit,
      usageLimitPerUser: coupon.usageLimitPerUser,
      isActive: coupon.isActive,
    },
  });
};
