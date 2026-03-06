import { db } from "@/shared/lib/db";

type createUserProps = {
  name: string;
  email: string;
  hashedPassword: string;
};

export const createUser = async ({ name, email, hashedPassword }: createUserProps) => {
  const user = await db.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true },
  });

  return user;
};
