import bcrypt from "bcrypt";

import { userRepositories } from "@/modules/user/repositories";
import { BadRequestError, NotFoundError } from "@/shared/utils/HttpErrors";

type ChangePasswordServiceParams = {
  userId: string;
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}: ChangePasswordServiceParams) => {
  const user = await userRepositories.findUserByIdWithPassword({ userId });

  if (!user) throw new NotFoundError("Usuário não encontrado.");
  if (!user.password) throw new BadRequestError("Contas com login social não possuem senha.");

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new BadRequestError("Senha atual incorreta.");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await userRepositories.updateUserById({
    userId,
    data: { password: hashedPassword },
  });
};
