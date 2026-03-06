import { GetUserResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { authServices } from "@/modules/auth/services";

export const getUser: RequestHandler = async (req, res: Response<GetUserResponse>) => {
  const { userId } = res.locals.user;

  const { user } = await authServices.findUserById({ userId });

  return res.json({ user });
};
