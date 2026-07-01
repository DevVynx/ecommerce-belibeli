import { userRepositories } from "@/modules/user/repositories";
import { NotFoundError } from "@/shared/utils/HttpErrors";

type DeleteAccountServiceParams = { userId: string };

export const deleteAccount = async ({ userId }: DeleteAccountServiceParams) => {
  const user = await userRepositories.findUserById({ userId });

  if (!user) throw new NotFoundError("Usuário não encontrado.");

  await userRepositories.deleteUser({ userId });
};
