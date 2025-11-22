import { verifyToken } from "@/shared/utils/verifyToken.js";
import type { RequestHandler } from "express";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const { userId, email } = await verifyToken(token);
    res.locals.user = { userId, email };
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};
