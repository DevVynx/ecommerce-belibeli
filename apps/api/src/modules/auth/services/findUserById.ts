import { type GetUserByIdParams } from "@/modules/auth/types/ServicesParams";
import { db } from "@/shared/lib/db";

export const findUserById = async ({ userId }: GetUserByIdParams) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    omit: { password: true, createdAt: true, updatedAt: true },
  });

  if (!user) {
    return { user: null };
  }

  return { user };
};
