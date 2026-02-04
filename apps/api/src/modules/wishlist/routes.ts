import { Router } from "express";

import {
  addItemToWishlist,
  findWishlist,
  removeItemFromWishlist,
} from "@/modules/wishlist/controllers";
import v from "@/modules/wishlist/validators";
import { authMiddleware } from "@/shared/middlewares/auth";

const wishlistRouter: Router = Router();

wishlistRouter.get("/wishlist", authMiddleware, findWishlist);
wishlistRouter.post("/wishlist", authMiddleware, v.addItemToWishlist.middleware, addItemToWishlist);
wishlistRouter.delete(
  "/wishlist/:productId",
  authMiddleware,
  v.removeItemFromWishlist.middleware,
  removeItemFromWishlist
);

export { wishlistRouter };
