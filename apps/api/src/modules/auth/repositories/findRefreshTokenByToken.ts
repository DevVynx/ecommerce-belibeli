import { db } from "@/shared/lib/db";

type findRefreshTokenByTokenProps = {
  token: string;
};

export const findRefreshTokenByToken = async ({ token }: findRefreshTokenByTokenProps) => {
  const refreshToken = db.refreshToken.findUnique({
    where: { token },
  });

  return refreshToken;
};
