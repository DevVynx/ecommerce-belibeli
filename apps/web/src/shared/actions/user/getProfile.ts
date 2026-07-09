"use server";

import type { UserProfile } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function getProfile() {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<{ user: UserProfile }>("/users/profile", {
      isPrivate: true,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
