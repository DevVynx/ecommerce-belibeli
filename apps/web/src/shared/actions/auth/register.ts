import type { RegisterRequest, RegisterResponse } from "@repo/types/contracts";

import { login } from "@/shared/actions/auth/login";
import { fetchClient } from "@/shared/utils/api/fetchClient";

export const register = async ({ name, email, password, confirmPassword }: RegisterRequest) => {
  const { data, error } = await fetchClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: { name, email, password, confirmPassword },
  });

  if (error) {
    return { data: null, error };
  }

  if (data) {
    await login({ email, password, rememberMe: true });
  }

  return { data, error: null };
};
