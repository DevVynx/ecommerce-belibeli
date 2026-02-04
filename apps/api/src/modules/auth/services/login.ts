import bcrypt from "bcrypt";

import { LoginParams } from "@/modules/auth/types/ServicesParams";
import { generateAccessToken, generateRefreshToken } from "@/modules/auth/utils/tokenGenerator";
import { db } from "@/shared/lib/db";
import { BadRequestError } from "@/shared/utils/HttpErrors";

export const login = async ({ email, password }: LoginParams) => {
  const user = await db.user.findUnique({
    where: { email },
    omit: { createdAt: true, updatedAt: true },
  });

  if (!user) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const { password: _pw, ...userWithoutPassword } = user;

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return { user: userWithoutPassword, accessToken, refreshToken };
};
