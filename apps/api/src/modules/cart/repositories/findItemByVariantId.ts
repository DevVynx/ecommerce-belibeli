import { db } from "@/shared/lib/db";

export const findCartItemByVariantId = async (cartId: string, productVariantId: string) => {
  const cartItem = await db.cartItem.findUnique({
    where: {
      cartId_productVariantId: {
        cartId,
        productVariantId,
      },
    },
    omit: { createdAt: true, updatedAt: true },
  });

  return cartItem;
};
