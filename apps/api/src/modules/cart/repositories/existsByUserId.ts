import { db } from "@/shared/lib/db";

export const existsCartByUserId = async (userId: string) => {
  const cart = await db.cart.findUnique({
    where: { userId },
    select: { id: true },
  });

  return cart;
};
