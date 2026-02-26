import { db } from "@/shared/lib/db";

export const addCartItem = async (cartId: string, productVariantId: string, quantity: number) => {
  const cartItem = await db.cartItem.create({
    data: {
      cartId,
      productVariantId,
      quantity,
    },
    omit: { createdAt: true, updatedAt: true },
  });

  return cartItem;
};
