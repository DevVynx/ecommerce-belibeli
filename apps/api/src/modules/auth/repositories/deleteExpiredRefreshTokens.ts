import { db } from "@/shared/lib/db";

export const deleteExpiredRefreshTokens = async () => {
  const result = await db.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
  
  return result;
};
