import { db } from "@/shared/lib/db";

export const createCart = async (userId: string) => {
  const cart = await db.cart.create({
    data: { userId },
    select: { id: true },
  });

  return cart;
};
