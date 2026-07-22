import { Router } from "express";

import { googleAuth, login, logout, refresh, register } from "@/modules/auth/controllers";
import v from "@/modules/auth/validators";
import { authMiddleware } from "@/shared/middlewares/auth";
import { authLimiter } from "@/shared/middlewares/rateLimiters";

const authRouter: Router = Router();

authRouter.post("/auth/register", authLimiter, v.register.middleware, register);
authRouter.post("/auth/login", authLimiter, v.login.middleware, login);
authRouter.post("/auth/logout", authLimiter, authMiddleware, logout);
authRouter.post("/auth/refresh", authLimiter, v.refresh.middleware, refresh);
authRouter.post("/auth/google", authLimiter, v.google.middleware, googleAuth);

export { authRouter };
