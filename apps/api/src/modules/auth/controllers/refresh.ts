import type { RefreshResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import v from "@/modules/auth/helpers/validators";
import { authServices } from "@/modules/auth/services";

export const refresh: RequestHandler = async (req, res: Response<RefreshResponse>) => {
  const { refreshToken } = v.refresh.getValidatedValues(req).body;

  const { accessToken, newRefreshToken } = await authServices.refreshAccessToken({
    refreshToken,
  });

  return res.status(201).json({ accessToken, refreshToken: newRefreshToken });
};
