"use server";

import type { SetDefaultAddressResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function setDefault(addressId: string) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<SetDefaultAddressResponse>(
      `/users/addresses/${addressId}/default`,
      {
        isPrivate: true,
        method: "PUT",
      }
    )
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
