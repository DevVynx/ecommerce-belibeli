import type { ApplyCouponResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { couponMappers } from "@/modules/coupon/mappers";
import { couponServices } from "@/modules/coupon/services";
import v from "@/modules/coupon/validators";

export const validateCoupon: RequestHandler = async (req, res: Response<ApplyCouponResponse>) => {
  const { userId } = res.locals.user;
  const { code } = v.validateCoupon.getValidatedValues(req).body;

  const { coupon, discountValue } = await couponServices.validateCoupon({ userId, code });

  return res.json({
    coupon: couponMappers.toCouponDto(coupon),
    discountValue: Number(discountValue),
  });
};
