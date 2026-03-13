import { db } from "@/shared/lib/db";

import type { Prisma } from "../../../../prisma/generated/client/client";

type findRefreshTokenByTokenProps = {
  token: string;
  select?: Prisma.RefreshTokenSelect;
};

export const findRefreshTokenByToken = async ({ token, select }: findRefreshTokenByTokenProps) => {
  const refreshToken = db.refreshToken.findUnique({
    where: { token },
    select,
  });

  return refreshToken;
};
