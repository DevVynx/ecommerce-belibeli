"use server";

import type { RegisterRequest, RegisterResponse } from "@repo/types/contracts";

import { login } from "@/shared/actions/auth/login";
import { fetchClient } from "@/shared/utils/api/fetchClient";

export const register = async (params: RegisterRequest) => {
  const { data, error } = await fetchClient<RegisterResponse>("/auth/register", {
    method: "POST",
    body: params,
  });

  if (error) {
    return { data: null, error };
  }

  if (data) {
    await login({ email: params.email, password: params.password, rememberMe: true });
  }

  return { data, error: null };
};
