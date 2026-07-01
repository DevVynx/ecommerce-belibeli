import type { RequestHandler, Response } from "express";

<<<<<<< HEAD
=======
import { orderMappers } from "@/modules/order/mappers";
>>>>>>> 1ec5953 (refactor(api): extract DTO mappers from services)
import { orderServices } from "@/modules/order/services";

export const listOrders: RequestHandler = async (_req, res: Response) => {
  const { userId } = res.locals.user;

  const { orders } = await orderServices.listOrders({ userId });

<<<<<<< HEAD
  res.json({ orders });
=======
  res.json({ orders: orders.map(orderMappers.toOrderDto) });
>>>>>>> 1ec5953 (refactor(api): extract DTO mappers from services)
};
