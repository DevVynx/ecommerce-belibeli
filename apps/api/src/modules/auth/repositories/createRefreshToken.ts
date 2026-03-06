import { db } from "@/shared/lib/db";

type createRefreshTokenProps = {
  userId: string;
  refreshToken: {
    token: string;
    expiresAt: Date;
  };
};

export const createRefreshToken = async ({ userId, refreshToken: rT }: createRefreshTokenProps) => {
  const refreshToken = await db.refreshToken.create({
    data: { userId, token: rT.token, expiresAt: rT.expiresAt },
  });

  return refreshToken.token;
};
