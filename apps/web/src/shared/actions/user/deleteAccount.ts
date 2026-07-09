"use server";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function deleteAccount() {
  const { error } = await withAuthRefresh(() =>
    fetchClient<void>("/users/account", {
      isPrivate: true,
      method: "DELETE",
    })
  );

  if (error) return { data: null, error };

  return { data: null, error: null };
}
