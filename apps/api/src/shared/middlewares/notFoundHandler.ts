import { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ message: "NOT FOUND ERROR", details: "Rota não encontrada" });
};
