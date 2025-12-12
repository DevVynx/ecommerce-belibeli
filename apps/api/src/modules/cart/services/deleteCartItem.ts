import type { RemoveItemFromCartParams } from "@/modules/cart/types/ServiceParams";
import { db } from "@/shared/lib/db";
import { ForbiddenError, NotFoundError } from "@/shared/utils/HttpErrors";

export const deleteCartItem = async ({
  userId,
  cartItemId,
}: RemoveItemFromCartParams) => {
  const item = await db.cartItem.findUnique({
    where: { id: cartItemId },
    include: { cart: { select: { userId: true } } },
  });

  if (!item) {
    throw new NotFoundError("Carrinho não encontrado para o usuário.");
  }

  if (item.cart.userId !== userId) {
    throw new ForbiddenError("Item não pertence ao usuário.");
  }

  await db.cartItem.delete({ where: { id: cartItemId } });
};
