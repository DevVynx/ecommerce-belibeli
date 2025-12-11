import { RequestHandler, Response } from "express";
import { cartServices } from "@/modules/cart/services";
import { FindCartResponse } from "@repo/types/contracts";

export const findCart: RequestHandler = async (
  _req,
  res: Response<FindCartResponse>
) => {
  const { userId } = res.locals.user;

  const { cart, count, subtotal, total, discount } =
    await cartServices.getFullCart({ userId });

  return res.json({ cart, count, subtotal, total, discount });
};
