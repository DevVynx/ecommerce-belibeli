"use server";

import type { UserProfile } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function updateProfile(input: { name: string; email: string }) {
  const { data, error } = await fetchClient<{ user: UserProfile }>("/users/profile", {
    isPrivate: true,
    method: "PUT",
    body: input,
  });

  if (error) return { data: null, error };

  return { data, error: null };
}
