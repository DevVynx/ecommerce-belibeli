import { db } from "@/shared/lib/db";

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  const cartItem = await db.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    omit: { createdAt: true, updatedAt: true },
  });

  return cartItem;
};
