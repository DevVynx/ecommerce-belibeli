import type { RequestHandler, Response } from "express";

import { orderServices } from "@/modules/order/services";

export const listOrders: RequestHandler = async (_req, res: Response) => {
  const { userId } = res.locals.user;

  const { orders } = await orderServices.listOrders({ userId });

  res.json({ orders });
};
