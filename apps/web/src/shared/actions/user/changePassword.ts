"use server";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function changePassword(input: { currentPassword: string; newPassword: string }) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<void>("/users/password", {
      isPrivate: true,
      method: "PUT",
      body: input,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
