import { db } from "@/shared/lib/db";

type FindUserByIdWithPasswordProps = {
  userId: string;
};

export const findUserByIdWithPassword = async ({ userId }: FindUserByIdWithPasswordProps) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });

  return user;
};
