import { authService } from "@/modules/auth/service.js";
import { authValidate } from "@/modules/auth/validation.js";
import { handleError } from "@/shared/utils/handleError.js";
import { handleResponse } from "@/shared/utils/handleResponse.js";
import { RequestHandler } from "express";

const register: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = authValidate.register(req.body);
    const user = await authService.register(name, email, password);

    return res.status(201).json({ user });
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = authValidate.login(req.body);
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
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

const refresh: RequestHandler = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken } = await authService.refreshAccessToken(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    return res.status(201).json({ message: "O token de acesso foi recriado com sucesso" });
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

export { login, register, refresh };
