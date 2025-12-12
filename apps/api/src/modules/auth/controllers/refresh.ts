import { RequestHandler } from "express";

import { authServices } from "@/modules/auth/services";

export const refresh: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const { accessToken } = await authServices.refreshAccessToken({
    refreshToken,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  return res
    .status(201)
    .json({ message: "O token de acesso foi recriado com sucesso" });
};
