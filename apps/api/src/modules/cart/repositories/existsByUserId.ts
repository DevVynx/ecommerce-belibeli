import { db } from "@/shared/lib/db";

type existsCartByUserIdProps = {
  userId: string;
};

export const existsCartByUserId = async ({ userId }: existsCartByUserIdProps) => {
  const cart = await db.cart.findUnique({
    where: { userId },
    select: { id: true },
  });

  return cart;
};
