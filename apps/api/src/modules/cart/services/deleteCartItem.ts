import { cartRepositories } from "@/modules/cart/repositories";
import type { RemoveItemFromCartParams } from "@/modules/cart/types/ServiceParams";
import { ForbiddenError, NotFoundError } from "@/shared/utils/HttpErrors";

export const deleteCartItem = async ({ userId, cartItemId }: RemoveItemFromCartParams) => {
  const cartItem = await cartRepositories.findItemById({ cartItemId });

  if (!cartItem) {
    throw new NotFoundError("Item do carrinho não encontrado.");
  }

  if (cartItem.cart.userId !== userId) {
    throw new ForbiddenError("Item do carrinho não pertence ao usuário.");
  }

  await cartRepositories.deleteItem({ cartItemId });
};
