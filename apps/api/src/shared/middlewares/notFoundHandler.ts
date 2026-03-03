import { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: "NotFoundError",
    message: "Rota não encontrada.",
    code: "NOT_FOUND",
  });
};
