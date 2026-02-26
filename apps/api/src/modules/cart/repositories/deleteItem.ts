import { db } from "@/shared/lib/db";

export const deleteCartItem = async (cartItemId: string) => {
  await db.cartItem.delete({ where: { id: cartItemId } });
};
