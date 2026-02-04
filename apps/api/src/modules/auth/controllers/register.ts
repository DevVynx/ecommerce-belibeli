import { RegisterResponse } from "@repo/types/contracts";
import { RequestHandler, Response } from "express";

import { authServices } from "@/modules/auth/services";
import v from "@/modules/auth/validators";

export const register: RequestHandler = async (req, res: Response<RegisterResponse>) => {
  const { name, email, password } = v.register.getValidatedValues(req).body;
  const { user, accessToken, refreshToken } = await authServices.register({
    name,
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

  return res.status(201).json({ user });
};
