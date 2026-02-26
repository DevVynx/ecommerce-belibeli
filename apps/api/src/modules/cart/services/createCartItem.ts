import { cartRepositories } from "@/modules/cart/repositories";
import type { CreateCartItemParams } from "@/modules/cart/types/ServiceParams";
import { productServices } from "@/modules/products/services";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "@/shared/utils/HttpErrors";

export const createCartItem = async ({
  userId,
  productVariantId,
  quantity,
}: CreateCartItemParams) => {
  const variant = await productServices.findVariantById(productVariantId);

  if (!variant) {
    throw new NotFoundError("Variante do produto não encontrada.");
  }

  if (!variant.isActive) {
    throw new UnprocessableEntityError("Esta variante do produto não está ativa.");
  }

  if (variant.stock < quantity) {
    throw new UnprocessableEntityError("Estoque insuficiente para esta variante.");
  }

  let cart = await cartRepositories.existsByUserId(userId);

  if (!cart) {
    cart = await cartRepositories.create(userId);
  }

  const existingItem = await cartRepositories.findItemByVariantId(cart.id, productVariantId);

  if (existingItem) {
    const updatedQuantity = existingItem.quantity + quantity;

    if (variant.stock < updatedQuantity) {
      throw new UnprocessableEntityError(
        "Estoque insuficiente para atualizar a quantidade no carrinho."
      );
    }

    const cartItem = await cartRepositories.updateItemQuantity(existingItem.id, updatedQuantity);

    return { cartItem };
  }

  const cartItem = await cartRepositories.addItem(cart.id, productVariantId, quantity);

  return { cartItem };
};
