import { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (_req, res, _next) => {
  res.status(404).json({ message: "NOT FOUND ERROR", details: "Rota não encontrada" });
};
