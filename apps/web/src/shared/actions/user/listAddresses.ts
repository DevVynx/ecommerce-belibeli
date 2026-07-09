"use server";

import type { ListAddressesResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function listAddresses() {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<ListAddressesResponse>("/users/addresses", {
      isPrivate: true,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
