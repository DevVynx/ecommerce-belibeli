import { RequestHandler, Response } from "express";
import { cartServices } from "@/modules/cart/services";
import { UpdateCartItemQuantityResponse } from "@repo/types/contracts";
import v from "@/modules/cart/validators";

export const updateCartItemQuantity: RequestHandler = async (
  req,
  res: Response<UpdateCartItemQuantityResponse>
) => {
  const { userId } = res.locals.user;
  const { cartItemId, quantity } =
    v.updateCartItemQuantity.getValidatedValues(req).body;

  const { cartItem } = await cartServices.updateCartItemQuantity({
    cartItemId,
    quantity,
    userId,
  });

  return res.json({ cartItem });
};
