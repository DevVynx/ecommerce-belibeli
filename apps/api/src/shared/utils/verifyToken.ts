import jwt from "jsonwebtoken";

import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "@/shared/utils/env";
import { UnauthorizedError } from "@/shared/utils/HttpErrors.js";

export async function verifyToken(
  token: string = "",
  type: "access" | "refresh" = "access"
) {
  if (!token) throw new UnauthorizedError("Token não fornecido.");

  const decoded = jwt.verify(
    token,
    type === "access" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET
  );
  const { userId } = decoded as {
    userId: string;
  };

  return { userId };
}
