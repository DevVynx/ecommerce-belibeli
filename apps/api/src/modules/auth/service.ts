import bcrypt from "bcrypt";
import { db } from "@/shared/lib/db";
import { generateAccessToken, generateRefreshToken } from "@/modules/auth/utils/tokenGenerator";
import { BadRequestError, ConflictError } from "@/shared/utils/HttpErrors";
import { verifyToken } from "@/shared/utils/verifyToken";
import { RegisterUser, LoginUser } from "@repo/types/contracts";

const register = async ({ name, email, password }: Omit<RegisterUser, "confirmPassword">) => {
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

const login = async ({ email, password }: LoginUser) => {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError("E-mail ou senha incorretos.");
  }

  const { password: _pw, ...userWithoutPassword } = user;

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken(user.id);

  return { user: userWithoutPassword, accessToken, refreshToken };
};

const refreshAccessToken = async (refreshToken: string) => {
  const { userId, email } = await verifyToken(refreshToken);

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new BadRequestError("Este usuário não existe.");
  }

  const newAccessToken = generateAccessToken(userId, email);

  return { accessToken: newAccessToken };
};

export const authService = { register, login, refreshAccessToken };
