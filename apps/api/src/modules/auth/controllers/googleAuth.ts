import { GoogleAuthResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import v from "@/modules/auth/helpers/validators";
import { authServices } from "@/modules/auth/services";

export const googleAuth: RequestHandler = async (req, res: Response<GoogleAuthResponse>) => {
  const { code } = v.google.getValidatedValues(req).body;
  const { user, accessToken, refreshToken } = await authServices.googleAuth({
    code,
  });

  return res.json({ user, accessToken, refreshToken });
};
