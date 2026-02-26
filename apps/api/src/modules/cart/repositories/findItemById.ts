import { db } from "@/shared/lib/db";

export const findCartItemById = async (cartItemId: string) => {
  const cartItem = await db.cartItem.findUnique({
    where: { id: cartItemId },
    include: { cart: { select: { userId: true } } },
    omit: { createdAt: true, updatedAt: true },
  });

  return cartItem;
};
