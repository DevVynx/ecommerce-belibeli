import { Router } from "express";

import {
  updateCartItemQuantity
} from "@/modules/shipping/controllers";
import v from "@/modules/shipping/validators";
import { authMiddleware } from "@/shared/middlewares/auth";

const shippingRouter: Router = Router();

shippingRouter.post(
  "/shipping/quote",
  authMiddleware,
  v.updateCartItemQuantity.middleware,
  updateCartItemQuantity
);

export { shippingRouter };
