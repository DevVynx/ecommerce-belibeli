import bcrypt from "bcrypt";

import { generateAccessToken, generateRefreshToken } from "@/modules/auth/helpers/tokenGenerator";
import { authRepositories } from "@/modules/auth/repositories";
import { RegisterParams } from "@/modules/auth/types/ServicesParams";
import { ConflictError } from "@/shared/utils/HttpErrors";

export const register = async ({ name, email, password }: RegisterParams) => {
  const existingUser = await authRepositories.findUserByEmail({ email });
  if (existingUser) {
    throw new ConflictError("Já existe um usuário com esse e-mail");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepositories.createUser({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true },
  });

  const accessToken = generateAccessToken(user.id, user.name, user.email);
  const refreshToken = generateRefreshToken(user.id);

  return { user, accessToken, refreshToken };
};
