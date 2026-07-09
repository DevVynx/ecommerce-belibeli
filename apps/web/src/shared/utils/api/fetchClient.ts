import { getAccessToken } from "@/shared/actions/auth/cookieActions";
import type { ApiErrorResponse } from "@/shared/types/api/error";
import { ENV } from "@/shared/utils/env";

import { parseActionError } from "./parseActionError";

export interface FetchOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number>;
  isPrivate?: boolean;
  body?: BodyInit | Record<string, unknown> | null;
}

export type FetchResult<T> = { data: T | null; error: ApiErrorResponse | null };

export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<FetchResult<T>> {
  const { isPrivate = false, params, body: originalBody, ...rest } = options;

  const baseUrl = ENV.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  let url = `${baseUrl}${cleanEndpoint}`;

  if (params) {
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    url += `?${searchParams.toString()}`;
  }

  const headers = new Headers(rest.headers);

  let body = originalBody;

  const isPlainObject =
    originalBody !== null &&
    typeof originalBody === "object" &&
    Object.getPrototypeOf(originalBody) === Object.prototype;

  if (isPlainObject) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    body = JSON.stringify(originalBody);
  }

  if (isPrivate) {
    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  try {
    const response = await fetch(url, {
      ...rest,
      headers,
      body: body as BodyInit,
    });

    const text = await response.text();
    let data: unknown = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      const errorPayload = data as Record<string, unknown> | null;

      return {
        data: null,
        error: {
          status: response.status,
          error: typeof errorPayload?.error === "string" ? errorPayload.error : "FetchError",
          message:
            (errorPayload?.message as string | Record<string, unknown>) ??
            "Erro na requisição à API.",
          code: typeof errorPayload?.code === "string" ? errorPayload.code : undefined,
        },
      };
    }

    return { data: data as T, error: null };
  } catch (error) {
    return { data: null, error: parseActionError(error) };
  }
}
