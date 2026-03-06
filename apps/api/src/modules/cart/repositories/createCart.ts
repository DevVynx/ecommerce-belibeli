import { db } from "@/shared/lib/db";

type createCartProps = {
  userId: string;
};

export const createCart = async ({ userId }: createCartProps) => {
  const cart = await db.cart.create({
    data: { userId },
    select: { id: true },
  });

  return cart;
};
