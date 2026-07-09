"use server";

import type { DeleteAddressResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function deleteAddress(addressId: string) {
  const { error } = await withAuthRefresh(() =>
    fetchClient<DeleteAddressResponse>(`/users/addresses/${addressId}`, {
      isPrivate: true,
      method: "DELETE",
    })
  );

  if (error) return { data: null, error };

  return { data: null, error: null };
}
