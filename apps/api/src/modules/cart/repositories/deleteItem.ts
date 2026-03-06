import { db } from "@/shared/lib/db";

type deleteCartItemProps = {
  cartItemId: string;
};

export const deleteCartItem = async ({ cartItemId }: deleteCartItemProps) => {
  await db.cartItem.delete({ where: { id: cartItemId } });
};
