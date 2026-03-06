"use server";

import type { LoginRequest, LoginResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

import { setAuthCookies } from "./cookieActions";

export const login = async ({
  email,
  password,
  rememberMe,
}: LoginRequest & { rememberMe: boolean }) => {
  const { data, error } = await fetchClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  if (error) {
    return { data: null, error };
  }

  if (data) {
    await setAuthCookies(
      {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      },
      rememberMe
    );
  }

  return { data, error: null };
};
