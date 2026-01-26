import type { GetShippingQuoteParams } from "@/modules/shipping/types/ServiceParams";
import { db } from "@/shared/lib/db";

export const getShippingQuote = async ({ userId, cartId, destinyCep }: GetShippingQuoteParams) => {
  const item = await db.cartItem.findUnique({
    where: { id: cartItemId },
    include: { cart: { select: { userId: true } } },
  });

  if (!item) {
    throw new NotFoundError("Item do carrinho não encontrado.");
  }

  if (item.cart.userId !== userId) {
    throw new ForbiddenError("Item do carrinho não pertence ao usuário.");
  }

  await db.cartItem.delete({ where: { id: cartItemId } });
};
