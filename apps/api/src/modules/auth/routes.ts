import { Router } from "express";

import { login, refresh, register } from "@/modules/auth/controllers";
import v from "@/modules/auth/validators";

const authRouter: Router = Router();

authRouter.post("/auth/register", v.register.middleware, register);
authRouter.post("/auth/login", v.login.middleware, login);
authRouter.post("/auth/refresh", refresh);

export { authRouter };
