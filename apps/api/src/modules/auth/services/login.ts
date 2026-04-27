import bcrypt from "bcrypt";

import { getTokenExpDate } from "@/modules/auth/helpers/getTokenExpDate";
import { generateAccessToken, generateRefreshToken } from "@/modules/auth/helpers/tokenGenerator";
import { authRepositories } from "@/modules/auth/repositories";
import { LoginParams } from "@/modules/auth/types/ServicesParams";
import { BadRequestError } from "@/shared/utils/HttpErrors";

export const login = async ({ email, password, rememberMe }: LoginParams) => {
  const user = await authRepositories.findUserByEmail({
    email,
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });

  if (!user || !user.password) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const { password: _pw, ...userWithoutPassword } = user;

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id, rememberMe ? "7d" : "6h");

  await authRepositories.createRefreshToken({
    refreshToken: { token: refreshToken, expiresAt: getTokenExpDate(refreshToken) },
    userId: user.id,
  });

  return { user: userWithoutPassword, accessToken, refreshToken };
};
