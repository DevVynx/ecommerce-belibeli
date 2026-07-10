import type { AdminSearchCouponsResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { couponServices } from "@/modules/coupon/services";
import v from "@/modules/coupon/validators";

export const searchCoupons: RequestHandler = async (
  req,
  res: Response<AdminSearchCouponsResponse>
) => {
  const { query } = v.searchCoupons.getValidatedValues(req);

  const result = await couponServices.searchCoupons(query);

  res.json(result);
};
