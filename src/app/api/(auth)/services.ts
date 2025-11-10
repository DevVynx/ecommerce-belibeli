import { db } from "@/app/shared/lib/db";
import { BadRequestError, ConflictError } from "../HttpErrors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Login, Register } from "./schemas";

async function register({ name, email, password }: Omit<Register, "confirm_password">) {
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
}

async function login({ email, password }: Login) {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const { password: _pw, ...userWithoutPassword } = user;

  const accessToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return { user: userWithoutPassword, accessToken };
}

export const authService = { register, login };
