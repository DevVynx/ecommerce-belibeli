"use server";

import type { LogoutResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

import { removeAuthCookies } from "./cookieActions";

export const logout = async () => {
  const { data, error } = await fetchClient<LogoutResponse>("/auth/logout", {
    method: "POST",
  });

  if (error) {
    return { data: null, error };
  }

  await removeAuthCookies();

  return { data, error: null };
};
