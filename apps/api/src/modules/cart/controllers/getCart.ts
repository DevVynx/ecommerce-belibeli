import { GetCartResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { cartMappers } from "@/modules/cart/mappers";
import { cartServices } from "@/modules/cart/services";

export const findCart: RequestHandler = async (_req, res: Response<GetCartResponse>) => {
  const { userId } = res.locals.user;

  const { cart } = await cartServices.findById({ userId });

  const { cart: formattedWishlist } = cartMappers.toUserCart(cart);

  return res.json({ cart: formattedWishlist });
};
