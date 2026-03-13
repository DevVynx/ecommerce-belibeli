"use server";

import type { GoogleAuthResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

import { setAuthCookies } from "./cookieActions";

export const googleAuthAction = async (code: string) => {
  const { data, error } = await fetchClient<GoogleAuthResponse>("/auth/google", {
    method: "POST",
    body: { code },
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
      true
    );
  }

  return { data, error: null };
};
