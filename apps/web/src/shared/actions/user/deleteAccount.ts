"use server";

import { fetchClient } from "@/shared/utils/api/fetchClient";

export async function deleteAccount() {
  const { error } = await fetchClient<void>("/users/account", {
    isPrivate: true,
    method: "DELETE",
  });

  if (error) return { data: null, error };

  return { data: null, error: null };
}
