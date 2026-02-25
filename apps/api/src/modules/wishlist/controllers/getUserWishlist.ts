import { GetUserWishlistResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { wishlistMapperToUserWishlist } from "@/modules/wishlist/mappers/toUserWishlist";
import { wishlistServices } from "@/modules/wishlist/services";

export const getUserWishlist: RequestHandler = async (
  _req,
  res: Response<GetUserWishlistResponse>
) => {
  const { userId } = res.locals.user;

  const { wishlist, count } = await wishlistServices.findByUserId({ userId });

  const formmatedWishlist = wishlistMapperToUserWishlist(wishlist);

  return res.json({ wishlist: formmatedWishlist, count });
};
