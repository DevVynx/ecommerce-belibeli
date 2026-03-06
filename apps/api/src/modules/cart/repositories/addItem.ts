import { db } from "@/shared/lib/db";

type addCartItemProps = {
  cartId: string;
  productVariantId: string;
  quantity: number;
};

export const addCartItem = async ({ cartId, productVariantId, quantity }: addCartItemProps) => {
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
