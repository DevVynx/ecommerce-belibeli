import { RequestHandler, Response } from "express";
import { cartServices } from "@/modules/cart/services";
import { FindAllCartItemsResponse } from "@repo/types/contracts";

export const findAllCartItems: RequestHandler = async (
  _req,
  res: Response<FindAllCartItemsResponse>
) => {
  const { userId } = res.locals.user;

  const { items, count } = await cartServices.getCartItems({ userId });

  return res.json({ items, count });
};
