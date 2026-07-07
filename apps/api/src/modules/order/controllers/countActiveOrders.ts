import type { AdminActiveOrdersResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { orderServices } from "@/modules/order/services";
import v from "@/modules/order/validators";

export const countActiveOrders: RequestHandler = async (
  req,
  res: Response<AdminActiveOrdersResponse>
) => {
  const { range } = v.activeOrders.getValidatedValues(req).query;
  const { activeOrders, percentageDelta } = await orderServices.countActiveOrders(range);

  res.json({ activeOrders, percentageDelta });
};
