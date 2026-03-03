import { ErrorRequestHandler } from "express";

import { HttpError } from "@/shared/utils/HttpErrors.js";

export const handleGlobalError: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    const { name, message, status, code } = error;
    return res.status(status).json({
      error: name,
      message,
      code,
    });
  }

  console.error(error);
  return res.status(500).json({
    error: "InternalServerError",
    message: "Erro interno no servidor.",
    code: "INTERNAL_SERVER_ERROR",
  });
};
