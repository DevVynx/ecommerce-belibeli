import { Router } from "express";

import { login, refresh, register } from "@/modules/auth/controllers";
import { getUser } from "@/modules/auth/controllers/getUser";
import v from "@/modules/auth/helpers/validators";
import { authMiddleware } from "@/shared/middlewares/auth";

const authRouter: Router = Router();

authRouter.get("/auth/me", authMiddleware, getUser);
authRouter.post("/auth/register", v.register.middleware, register);
authRouter.post("/auth/login", v.login.middleware, login);
authRouter.post("/auth/refresh", refresh);

export { authRouter };
