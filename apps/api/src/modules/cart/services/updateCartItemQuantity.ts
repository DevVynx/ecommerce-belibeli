import type { UpdateCartItemQuantityParams } from "@/modules/cart/types/ServiceParams";
import { db } from "@/shared/lib/db";
import { ForbiddenError, NotFoundError } from "@/shared/utils/HttpErrors";

export const updateCartItemQuantity = async ({
  userId,
  cartItemId,
  quantity,
}: UpdateCartItemQuantityParams) => {
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

  const cartItem = await db.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    omit: { createdAt: true, updatedAt: true },
  });

  return { cartItem };
};
