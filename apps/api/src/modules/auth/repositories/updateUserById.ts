import { db } from "@/shared/lib/db";

import type { Prisma } from "../../../../prisma/generated/client/client";

type UpdateUserByIdProps = {
  userId: string;
  data: Prisma.UserUpdateInput;
  select?: Prisma.UserSelect;
};

export const updateUserById = async ({ userId, data, select }: UpdateUserByIdProps) => {
  const user = await db.user.update({
    where: { id: userId },
    data,
    select,
  });

  return user;
};
