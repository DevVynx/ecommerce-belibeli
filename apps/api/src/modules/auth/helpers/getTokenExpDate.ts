import jwt from "jsonwebtoken";

import { UnauthorizedError } from "@/shared/utils/HttpErrors.js";

export function getTokenExpDate(token: string) {
  const decoded = jwt.decode(token);

  if (!decoded || typeof decoded === "string" || typeof decoded.exp !== "number") {
    throw new UnauthorizedError("Token inválido.");
  }

  return new Date(decoded.exp * 1000);
}
