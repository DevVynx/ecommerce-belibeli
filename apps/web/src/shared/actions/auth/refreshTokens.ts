"use server";

import type { RefreshResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

import { getRefreshToken, setAuthCookies } from "./cookieActions";

export const refreshTokens = async () => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return { success: false, error: "No refresh token" } as const;
  }

  const { data, error } = await fetchClient<RefreshResponse>("/auth/refresh", {
    method: "POST",
    body: { refreshToken },
  });

  if (error || !data) {
    return { success: false, error: error?.message ?? "Refresh failed" } as const;
  }

  await setAuthCookies({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });

  return { success: true } as const;
};
