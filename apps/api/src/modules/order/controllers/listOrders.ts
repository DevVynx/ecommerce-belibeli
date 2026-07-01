import type { RequestHandler, Response } from "express";

import { orderMappers } from "@/modules/order/mappers";
import { orderServices } from "@/modules/order/services";

export const listOrders: RequestHandler = async (_req, res: Response) => {
  const { userId } = res.locals.user;

  const { orders } = await orderServices.listOrders({ userId });

  res.json({ orders: orders.map(orderMappers.toOrderDto) });
};
