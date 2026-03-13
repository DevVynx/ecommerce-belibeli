import { db } from "@/shared/lib/db";

import type { Prisma } from "../../../../prisma/generated/client/client";

type createUserProps = {
  data: Prisma.UserCreateInput;
  select?: Prisma.UserSelect;
};

export const createUser = async ({ data, select }: createUserProps) => {
  const user = await db.user.create({
    data,
    select,
  });

  return user;
};
