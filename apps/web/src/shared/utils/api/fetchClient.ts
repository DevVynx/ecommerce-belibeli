import { getAccessToken } from "@/shared/actions/auth/cookieActions";
import type { ApiErrorResponse } from "@/shared/types/api/error";

import { parseActionError } from "./parseActionError";

interface FetchOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number>;
  isPrivate?: boolean;
  body?: BodyInit | Record<string, unknown> | null;
}

/**
 * Wrapper sobre o fetch nativo para facilitar requisições.
 * Gerencia URL base, Query Params e injeção automática de Bearer Tokens.
 */
export async function fetchClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<{ data: T | null; error: ApiErrorResponse | null }> {
  const { isPrivate = false, params, body: originalBody, ...rest } = options;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "";
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

  // Verifica se o corpo é um objeto literal {} para tratar como JSON
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
      // Se não for JSON, tratamos como nulo para cair nos defaults abaixo
      data = null;
    }

    if (!response.ok) {
      // Cast para extração segura de campos de erro
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
