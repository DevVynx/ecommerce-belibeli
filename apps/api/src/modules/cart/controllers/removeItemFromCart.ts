import { RemoveCartItemResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { cartServices } from "@/modules/cart/services";
import v from "@/modules/cart/validators";

export const removeItemFromCart: RequestHandler = async (
  req,
  res: Response<RemoveCartItemResponse>
) => {
  const { userId } = res.locals.user;
  const { cartItemId } = v.removeItemFromCart.getValidatedValues(req).body;

  await cartServices.deleteCartItem({ cartItemId, userId });

  return res.status(204).send();
};
