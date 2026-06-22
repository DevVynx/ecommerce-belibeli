import type { RefreshResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { authServices } from "@/modules/auth/services";
import v from "@/modules/auth/validators";

export const refresh: RequestHandler = async (req, res: Response<RefreshResponse>) => {
  const { refreshToken } = v.refresh.getValidatedValues(req).body;

  const { accessToken, newRefreshToken } = await authServices.refreshTokens({
    refreshToken,
  });

  return res.status(201).json({ accessToken, refreshToken: newRefreshToken });
};
