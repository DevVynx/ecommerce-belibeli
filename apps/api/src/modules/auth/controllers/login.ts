import { LoginResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { authServices } from "@/modules/auth/services";
import v from "@/modules/auth/validators";

export const login: RequestHandler = async (req, res: Response<LoginResponse>) => {
  const { email, password } = v.login.getValidatedValues(req).body;
  const { user, accessToken, refreshToken } = await authServices.login({
    email,
    password,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.json({ user });
};
