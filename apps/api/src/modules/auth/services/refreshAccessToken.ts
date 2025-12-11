import { db } from "@/shared/lib/db";
import { generateAccessToken } from "@/modules/auth/utils/tokenGenerator";
import { BadRequestError } from "@/shared/utils/HttpErrors";
import { verifyToken } from "@/shared/utils/verifyToken";
import { RefreshAccessTokenParams } from "@/modules/auth/types/ServicesParams";

export const refreshAccessToken = async ({
  refreshToken,
}: RefreshAccessTokenParams) => {
  const { userId } = await verifyToken(refreshToken, "refresh");
  console.log(userId);

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new BadRequestError("Este usuário não existe.");
  }

  const newAccessToken = generateAccessToken(userId);

  return { accessToken: newAccessToken };
};
