import { userRepositories } from "@/modules/user/repositories";
import type { UpdateProfileRequest } from "@repo/types/contracts";

type UpdateProfileServiceParams = { userId: string } & UpdateProfileRequest;

export const updateProfile = async ({ userId, name, email }: UpdateProfileServiceParams) => {
  const user = await userRepositories.updateUserById({
    userId,
    data: { name, email },
  });

  const { googleId: _, ...userProfile } = user;

  return { user: userProfile };
};
