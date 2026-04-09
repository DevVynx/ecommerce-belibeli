import { authRepositories } from "@/modules/auth/repositories";
import type { LogoutParams } from "@/modules/auth/types/ServicesParams";

export const logout = async ({ userId }: LogoutParams) => {
  await authRepositories.deleteManyRefreshTokensByUserId({ userId });
};
