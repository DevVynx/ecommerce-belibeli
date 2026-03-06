import { db } from "@/shared/lib/db";

type deleteManyRefreshTokensByUserIdProps = {
  userId: string;
};

export const deleteManyRefreshTokensByUserId = async ({
  userId,
}: deleteManyRefreshTokensByUserIdProps) => {
  await db.refreshToken.deleteMany({
    where: { userId },
  });
};
