import type { RequestHandler } from "express";

import { verifyToken } from "@/shared/utils/verifyToken.js";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({
      error: "UnauthorizedError",
      message: "Token não fornecido ou formato inválido.",
      code: "NO_TOKEN_PROVIDED",
    });

  const accessToken = authHeader.split(" ")[1];

  try {
    const { userId } = await verifyToken(accessToken, "access");
    res.locals.user = { userId };
    next();
  } catch {
    return res.status(401).json({
      error: "UnauthorizedError",
      message: "Token inválido.",
      code: "INVALID_TOKEN",
    });
  }
};
