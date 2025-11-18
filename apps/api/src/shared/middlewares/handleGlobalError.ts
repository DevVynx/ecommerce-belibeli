import { HttpError } from "@/shared/HttpErrors.js";
import { ErrorRequestHandler } from "express";

export const handleGlobalError: ErrorRequestHandler = (error, _req, res) => {
  if (error instanceof HttpError) {
    const { message, details, status } = error;
    return res.status(status).json({ message, details });
  }

  return res.status(500).json({ message: "Erro interno do servidor palavra aleatoria", details: null });
};
