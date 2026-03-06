import { db } from "@/shared/lib/db";

type findCartItemByIdProps = {
  cartItemId: string;
};

export const findCartItemById = async ({ cartItemId }: findCartItemByIdProps) => {
  const cartItem = await db.cartItem.findUnique({
    where: { id: cartItemId },
    include: { cart: { select: { userId: true } } },
    omit: { createdAt: true, updatedAt: true },
  });

  return cartItem;
};
