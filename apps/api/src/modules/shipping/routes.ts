import { Router } from "express";

import { quoteShipping } from "@/modules/shipping/controllers";
import v from "@/modules/shipping/validators";
import { authMiddleware } from "@/shared/middlewares/auth";
import { shippingLimiter } from "@/shared/middlewares/rateLimiters";

const shippingRouter: Router = Router();

shippingRouter.post(
  "/shipping/quote",
  shippingLimiter,
  authMiddleware,
  v.quoteShipping.middleware,
  quoteShipping
);

export { shippingRouter };
