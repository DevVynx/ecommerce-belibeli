"use server";

import type { AddressInput, CreateAddressResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function createAddress(input: AddressInput) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<CreateAddressResponse>("/users/addresses", {
      isPrivate: true,
      method: "POST",
      body: input,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
