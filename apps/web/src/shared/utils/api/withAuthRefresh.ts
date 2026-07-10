import { redirect } from "next/navigation";

import { getRefreshToken, setAuthCookies } from "@/shared/actions/auth/cookieActions";
import { useAuthMutex } from "@/shared/states/auth";
import { ENV } from "@/shared/utils/env";
import { clearAllStorages } from "@/shared/utils/store/state/clearAllStorages";

import type { FetchResult } from "./fetchClient";

async function refreshAndLogout() {
  clearAllStorages();

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  } else {
    redirect("/login");
  }
}

async function doRefreshToken() {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const baseUrl = ENV.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Refresh failed");
  }

  const data = (await response.json()) as { accessToken: string; refreshToken: string };
  await setAuthCookies({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  });
}

export async function withAuthRefresh<T>(
  request: () => Promise<FetchResult<T>>
): Promise<FetchResult<T>> {
  const result = await request();

  if (result.error?.status !== 401) return result;

  const refreshToken = await getRefreshToken();
  if (!refreshToken) return result;

  const mutex = useAuthMutex.getState();
  const existingRefresh = mutex.refreshPromise;

  if (existingRefresh) {
    try {
      await existingRefresh;
    } catch {
      return result;
    }
  } else {
    const promise = doRefreshToken();
    mutex.setRefreshPromise(promise);
    try {
      await promise;
    } catch {
      mutex.setRefreshPromise(null);
      await refreshAndLogout();
      return result;
    }
    mutex.setRefreshPromise(null);
  }

  const retryResult = await request();

  if (retryResult.error?.status === 401) {
    await refreshAndLogout();
  }

  return retryResult;
}
