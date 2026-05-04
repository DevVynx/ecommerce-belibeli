"use server";

import type { LoginRequest, LoginResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

import { setAuthCookies } from "./cookieActions";

export const login = async (params: LoginRequest) => {
  const { data, error } = await fetchClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: params,
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
      params.rememberMe
    );
  }

  return { data, error: null };
};
