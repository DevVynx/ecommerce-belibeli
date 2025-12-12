import type { RequestHandler } from "express";

import { verifyToken } from "@/shared/utils/verifyToken.js";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken)
    return res.status(401).json({ error: "Token não fornecido" });

  try {
    const { userId } = await verifyToken(accessToken, "access");
    res.locals.user = { userId };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};
