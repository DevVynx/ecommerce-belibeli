"use server";

import type { UploadVariantImageResponse } from "@repo/types/contracts";

import { fetchClient } from "@/shared/utils/api/fetchClient";
import { withAuthRefresh } from "@/shared/utils/api/withAuthRefresh";

export async function uploadImage(formData: FormData) {
  const { data, error } = await withAuthRefresh(() =>
    fetchClient<UploadVariantImageResponse>("/admin/products/uploadImage", {
      isPrivate: true,
      method: "POST",
      body: formData,
    })
  );

  if (error) return { data: null, error };

  return { data, error: null };
}
