import { db } from "@/shared/lib/db";

type deleteRefreshTokenByTokenProps = {
  refreshToken: string;
};

export const deleteRefreshTokenByToken = async ({
  refreshToken,
}: deleteRefreshTokenByTokenProps) => {
  await db.refreshToken.delete({
    where: { token: refreshToken },
  });
};
