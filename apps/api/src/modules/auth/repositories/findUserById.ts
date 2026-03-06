import { db } from "@/shared/lib/db";

type findUserByIdProps = {
  userId: string;
};

export const findUserById = async ({ userId }: findUserByIdProps) => {
  const user = db.user.findUnique({
    where: { id: userId },
  });

  return user;
};
