import {
  addItemToCart,
  findAllCartItems,
  findCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/modules/cart/controller.js";
import { authMiddleware } from "@/shared/middlewares/auth.js";
import { Router } from "express";

const cartRouter: Router = Router();

cartRouter.get("/cart", authMiddleware, findCart);
cartRouter.get("/cart/items", authMiddleware, findAllCartItems);
cartRouter.post("/cart/items", authMiddleware, addItemToCart);
cartRouter.patch("/cart/items/:cartItemId/quantity", authMiddleware, updateCartItemQuantity);
cartRouter.delete("/cart/items/:cartItemId", authMiddleware, removeItemFromCart);

export { cartRouter };
