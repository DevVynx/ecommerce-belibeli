import { db } from "@/shared/lib/db";

type markRefreshTokenAsUsedProps = {
  token: string;
};

export const markRefreshTokenAsUsed = async ({ token }: markRefreshTokenAsUsedProps) => {
  await db.refreshToken.update({
    where: { token },
    data: { isUsed: true },
  });
};
