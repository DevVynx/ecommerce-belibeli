import { Router } from "express";

import { createOrder, listOrders, stripeWebhook } from "@/modules/order/controllers";
import { authMiddleware } from "@/shared/middlewares/auth";

import v from "./validators";

const orderRouter: Router = Router();

orderRouter.get("/orders", authMiddleware, listOrders);
orderRouter.post("/orders", authMiddleware, v.createOrder.middleware, createOrder);
orderRouter.post("/webhook/stripe", stripeWebhook);

export { orderRouter };
