import bcrypt from "bcrypt";
import { db } from "@/shared/lib/db";
import { ConflictError } from "@/shared/utils/HttpErrors";
import { RegisterParams } from "@/modules/auth/types/ServicesParams";

export const register = async ({ name, email, password }: RegisterParams) => {
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ConflictError("Já existe um usuário com esse e-mail");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true },
  });

  return user;
};
