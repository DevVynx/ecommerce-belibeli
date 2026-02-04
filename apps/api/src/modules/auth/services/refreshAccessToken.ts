import { RefreshAccessTokenParams } from "@/modules/auth/types/ServicesParams";
import { generateAccessToken } from "@/modules/auth/utils/tokenGenerator";
import { db } from "@/shared/lib/db";
import { BadRequestError } from "@/shared/utils/HttpErrors";
import { verifyToken } from "@/shared/utils/verifyToken";

export const refreshAccessToken = async ({ refreshToken }: RefreshAccessTokenParams) => {
  const { userId } = await verifyToken(refreshToken, "refresh");

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new BadRequestError("Este usuário não existe.");
  }

  const newAccessToken = generateAccessToken(userId);

  return { accessToken: newAccessToken };
};
