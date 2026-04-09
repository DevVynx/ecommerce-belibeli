import { LogoutResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { authServices } from "@/modules/auth/services";

export const logout: RequestHandler = async (_req, res: Response<LogoutResponse>) => {
  const { userId } = res.locals.user;
  await authServices.logout({ userId });

  return res.status(204).send();
};
