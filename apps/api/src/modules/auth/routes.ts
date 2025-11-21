import { login, refresh, register } from "@/modules/auth/controller";
import v from "@/modules/auth/validators";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/auth/register", v.register.middleware, register);
authRouter.post("/auth/login", v.login.middleware, login);
authRouter.post("/auth/refresh", refresh);

export { authRouter };
