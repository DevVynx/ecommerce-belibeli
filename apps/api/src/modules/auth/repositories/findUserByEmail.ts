import { db } from "@/shared/lib/db";

import type { Prisma } from "../../../../prisma/generated/client/client";

type findUserByEmailProps = {
  email: string;
  select?: Prisma.UserSelect;
};

export const findUserByEmail = async ({ email, select }: findUserByEmailProps) => {
  const user = await db.user.findUnique({
    where: { email },
    select,
  });

  return user;
};
