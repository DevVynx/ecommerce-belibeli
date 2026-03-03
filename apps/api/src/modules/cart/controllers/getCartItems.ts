import { GetCartItemsResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { cartMappers } from "@/modules/cart/mappers";
import { cartServices } from "@/modules/cart/services";

export const findAllCartItems: RequestHandler = async (
  _req,
  res: Response<GetCartItemsResponse>
) => {
  const { userId } = res.locals.user;

  const { items, count } = await cartServices.getCartItems({ userId });

  const { items: formmatedItems } = cartMappers.toGetCartItems(items);

  return res.json({ items: formmatedItems, count });
};
