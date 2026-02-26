import { db } from "@/shared/lib/db";

export const findVariantById = async (variantId: string) => {
  const variant = await db.productVariant.findUnique({
    where: { id: variantId },
  });

  return variant;
};
