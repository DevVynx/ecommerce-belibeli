import { getTokenExpDate } from "@/modules/auth/helpers/getTokenExpDate";
import { generateAccessToken, generateRefreshToken } from "@/modules/auth/helpers/tokenGenerator";
import { authRepositories } from "@/modules/auth/repositories";
import { RefreshAccessTokenParams } from "@/modules/auth/types/ServicesParams";
import { UnauthorizedError } from "@/shared/utils/HttpErrors";

export const refreshAccessToken = async ({ refreshToken }: RefreshAccessTokenParams) => {
  const existingToken = await authRepositories.findRefreshTokenByToken({ token: refreshToken });

  if (!existingToken) {
    throw new UnauthorizedError("Token inválido.");
  }

  const user = await authRepositories.findUserById({ userId: existingToken.userId });

  if (!user) {
    throw new UnauthorizedError("O usuário pertencente ao token não existe.");
  }

  if (existingToken.isUsed === true) {
    await authRepositories.deleteManyRefreshTokensByUserId({ userId: user.id });
    throw new UnauthorizedError("Alerta de segurança: sessão comprometida.");
  }

  if (new Date() > existingToken.expiresAt) {
    await authRepositories.deleteRefreshTokenByToken({ refreshToken });
    throw new UnauthorizedError("Sessão expirada. Faça login novamente.");
  }

  await authRepositories.markRefreshTokenAsUsed({ token: refreshToken });

  const newAccessToken = generateAccessToken(user.id, user.name, user.email);
  const newRefreshToken = generateRefreshToken(user.id);

  await authRepositories.createRefreshToken({
    refreshToken: { token: newRefreshToken, expiresAt: getTokenExpDate(newRefreshToken) },
    userId: user.id,
  });

  return { accessToken: newAccessToken, newRefreshToken };
};
