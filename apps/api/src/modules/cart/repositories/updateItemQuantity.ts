import { db } from "@/shared/lib/db";

type updateCartItemQuantityProps = {
  cartItemId: string;
  quantity: number;
};

export const updateCartItemQuantity = async ({
  cartItemId,
  quantity,
}: updateCartItemQuantityProps) => {
  const cartItem = await db.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    omit: { createdAt: true, updatedAt: true },
  });

  return cartItem;
};
