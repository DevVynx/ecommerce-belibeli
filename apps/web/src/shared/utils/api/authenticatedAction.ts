import { redirect } from "next/navigation";

import { logout } from "@/shared/actions/auth/logout";
import { refreshTokens } from "@/shared/actions/auth/refreshTokens";
import { useAuthMutex } from "@/shared/states/auth";
import type { ApiErrorResponse } from "@/shared/types/api/error";

type ActionResult<T> = {
  data: T | null;
  error: ApiErrorResponse | null;
};

type ActionFn<TArgs extends unknown[], TResult> = (
  ...args: TArgs
) => Promise<ActionResult<TResult>>;

const MAX_RETRIES = 1;

export async function authenticatedAction<TArgs extends unknown[], TResult>(
  action: ActionFn<TArgs, TResult>,
  ...args: TArgs
): Promise<ActionResult<TResult>> {
  const executeWithRetry = async (retries: number): Promise<ActionResult<TResult>> => {
    const result = await action(...args);

    if (result.error?.status === 401) {
      if (retries >= MAX_RETRIES) {
        await logout();
        redirect("/login");
      }

      const existingRefresh = useAuthMutex.getState().refreshPromise;

      if (existingRefresh) {
        await existingRefresh;
      } else {
        const refreshPromise = refreshTokens();
        useAuthMutex.getState().setRefreshPromise(refreshPromise);

        try {
          await refreshPromise;
        } finally {
          useAuthMutex.getState().setRefreshPromise(null);
        }
      }

      return executeWithRetry(retries + 1);
    }

    return result;
  };

  return executeWithRetry(0);
}
