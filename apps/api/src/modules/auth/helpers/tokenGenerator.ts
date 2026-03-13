import jwt, { SignOptions } from "jsonwebtoken";

import { ENV } from "@/shared/utils/env";

export const generateAccessToken = (userId: string) => {
  const accessToken = jwt.sign({ userId }, ENV.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

export const generateRefreshToken = (userId: string, expiresIn: SignOptions["expiresIn"] = "7d") => {
  const refreshToken = jwt.sign({ userId }, ENV.JWT_REFRESH_SECRET, {
    expiresIn,
  });
  return refreshToken;
};
