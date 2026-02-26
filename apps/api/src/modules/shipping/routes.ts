import { Router } from "express";

import { quoteShipping } from "@/modules/shipping/controllers";
import v from "@/modules/shipping/helpers/validators";
import { authMiddleware } from "@/shared/middlewares/auth";

const shippingRouter: Router = Router();

shippingRouter.post("/shipping/quote", authMiddleware, v.quoteShipping.middleware, quoteShipping);

export { shippingRouter };
