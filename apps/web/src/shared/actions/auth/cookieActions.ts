"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_NAME = "accessToken";
const REFRESH_TOKEN_NAME = "refreshToken";

export async function setAuthCookies(
  tokens: { accessToken: string; refreshToken: string },
  extendedExpiration: boolean = false
) {
  await setAccessToken(tokens.accessToken);

  await setRefreshToken(tokens.refreshToken, extendedExpiration);
}

export async function setAccessToken(accessToken: string) {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_NAME, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutos
  });
}

export async function setRefreshToken(refreshToken: string, extendedExpiration: boolean) {
  const cookieStore = await cookies();

  cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: extendedExpiration ? 7 * 24 * 60 * 60 : 6 * 60 * 60, // 7 dias ou 6 horas
  });
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_NAME)?.value;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_NAME)?.value;
}

export async function removeAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
}
