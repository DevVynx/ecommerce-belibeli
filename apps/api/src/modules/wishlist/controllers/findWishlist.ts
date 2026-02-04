import { FindWishlistResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { wishlistServices } from "@/modules/wishlist/services";

export const findWishlist: RequestHandler = async (_req, res: Response<FindWishlistResponse>) => {
  const { userId } = res.locals.user;

  const { wishlist, count } = await wishlistServices.findById({ userId });

  return res.json({ wishlist, count });
};
