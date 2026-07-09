"use server";

import type { LogoutResponse } from "@repo/types/contracts";

import { useAuthMutex } from "@/shared/states/auth";
import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

import { removeAuthCookies } from "./cookieActions";
import { refreshTokens } from "./refreshTokens";

export const logout = async () => {
  const existingPromise = useAuthMutex.getState().logoutPromise;

  if (existingPromise) {
    await existingPromise;
    return;
  }

  const logoutPromise = (async () => {
    await refreshTokens();

    await withAuthRefresh(() =>
      fetchClient<LogoutResponse>("/auth/logout", {
        method: "POST",
        isPrivate: true,
      })
    );

    await removeAuthCookies();
  })();

  useAuthMutex.getState().setLogoutPromise(logoutPromise);

  await logoutPromise;

  useAuthMutex.getState().setLogoutPromise(null);
};
