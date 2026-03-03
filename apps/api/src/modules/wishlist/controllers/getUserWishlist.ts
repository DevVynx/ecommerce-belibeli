import { GetUserWishlistResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { wishlistMappers } from "@/modules/wishlist/mappers";
import { wishlistServices } from "@/modules/wishlist/services";

export const getUserWishlist: RequestHandler = async (
  _req,
  res: Response<GetUserWishlistResponse>
) => {
  const { userId } = res.locals.user;

  const { wishlist } = await wishlistServices.findByUserId({ userId });

  const { wishlist: formmatedWishlist } = wishlistMappers.toUserWishlist(wishlist);

  return res.json({ wishlist: formmatedWishlist });
};
