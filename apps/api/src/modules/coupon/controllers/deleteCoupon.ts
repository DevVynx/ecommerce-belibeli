import type { DeleteCouponResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { couponServices } from "@/modules/coupon/services";
import v from "@/modules/coupon/validators";

export const deleteCoupon: RequestHandler = async (req, res: Response<DeleteCouponResponse>) => {
  const { id } = v.deleteCoupon.getValidatedValues(req).params;

  await couponServices.deleteCoupon(id);

  res.status(204).send();
};
