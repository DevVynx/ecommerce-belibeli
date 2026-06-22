import type { RequestHandler } from "express";

import { ForbiddenError } from "@/shared/utils/HttpErrors";

export const adminOnlyMiddleware: RequestHandler = async (req, res, next) => {
  if (res.locals.user.role !== "ADMIN") {
    throw new ForbiddenError("Acesso restrito a administradores.");
  }
  next();
};
