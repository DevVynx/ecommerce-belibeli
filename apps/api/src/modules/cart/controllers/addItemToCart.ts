import { AddItemToCartResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { cartServices } from "@/modules/cart/services";
import v from "@/modules/cart/validators";

export const addItemToCart: RequestHandler = async (req, res: Response<AddItemToCartResponse>) => {
  const { userId } = res.locals.user;
  const { productId, productOptions, quantity } = v.addItemToCart.getValidatedValues(req).body;

  const { cartItem } = await cartServices.createCartItem({
    userId,
    productId,
    quantity,
    productOptions,
  });

  return res.status(201).json({ cartItem });
};
