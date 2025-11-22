import { UnauthorizedError } from "@/shared/utils/HttpErrors.js";
import { JWTPayload, jwtVerify } from "jose";

export async function verifyToken(token: string = "") {
  if (!token) throw new UnauthorizedError("Token não fornecido.");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const { payload } = await jwtVerify(token, secret);
  const { email, userId } = payload as JWTPayload & {
    userId: number;
    email: string;
  };

  return { email, userId };
}
