import { db } from "@/shared/lib/db";

type findUserByEmailProps = {
  email: string;
};

export const findUserByEmail = async ({ email }: findUserByEmailProps) => {
  const user = await db.user.findUnique({
    where: { email },
    omit: { createdAt: true, updatedAt: true },
  });

  return user;
};
