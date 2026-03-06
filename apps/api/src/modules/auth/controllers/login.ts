import { LoginResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import v from "@/modules/auth/helpers/validators";
import { authServices } from "@/modules/auth/services";

export const login: RequestHandler = async (req, res: Response<LoginResponse>) => {
  const { email, password } = v.login.getValidatedValues(req).body;
  const { user, accessToken, refreshToken } = await authServices.login({
    email,
    password,
  });

  return res.json({ user, accessToken, refreshToken });
};
