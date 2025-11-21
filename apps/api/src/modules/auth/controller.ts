import { RequestHandler } from "express";
import { authService } from "@/modules/auth/service";
import v from "@/modules/auth/validators";

const register: RequestHandler = async (req, res) => {
  const { name, email, password } = v.register.getValidatedValues(req).body;
  const user = await authService.register(name, email, password);

  return res.status(201).json({ user });
};

const login: RequestHandler = async (req, res) => {
  const { email, password } = v.login.getValidatedValues(req).body;
  const { user, accessToken, refreshToken } = await authService.login(email, password);

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

const refresh: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const { accessToken } = await authService.refreshAccessToken(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  return res.status(201).json({ message: "O token de acesso foi recriado com sucesso" });
};

export { login, register, refresh };
