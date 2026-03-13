import jwt from "jsonwebtoken";

import { ENV } from "@/shared/utils/env";
import { UnauthorizedError } from "@/shared/utils/HttpErrors.js";

export async function verifyToken(token: string = "", type: "access" | "refresh") {
  if (!token) throw new UnauthorizedError("Token não fornecido.");

  const decoded = jwt.verify(
    token,
    type === "access" ? ENV.JWT_ACCESS_SECRET : ENV.JWT_REFRESH_SECRET
  );
  const { userId } = decoded as {
    userId: string;
  };

  return { userId };
}
