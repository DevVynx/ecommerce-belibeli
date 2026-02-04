import { ErrorRequestHandler } from "express";

import { HttpError } from "@/shared/utils/HttpErrors.js";

export const handleGlobalError: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    const { message, details, status } = error;
    return res.status(status).json({ message, details });
  }

  console.log(error);
  return res.status(500).json({ message: "Erro interno do servidor", details: null });
};
