import { cartRepositories } from "@/modules/cart/repositories";
import { cartServices } from "@/modules/cart/services";
import type { CreateCartItemParams } from "@/modules/cart/types/ServiceParams";
import { productServices } from "@/modules/products/services";
import { NotFoundError, UnprocessableEntityError } from "@/shared/utils/HttpErrors";

export const addCartItem = async ({
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

  let cart = await cartRepositories.existsByUserId({ userId });

  if (!cart) {
    cart = await cartRepositories.create({ userId });
  }

  const existingItem = await cartRepositories.findItemByVariantId({
    cartId: cart.id,
    productVariantId,
  });

  if (existingItem) {
    const { cartItem } = await cartServices.updateCartItemQuantity({
      userId,
      cartItemId: existingItem.id,
      quantity: quantity + existingItem.quantity,
    });

    return { cartItem };
  }

  const cartItem = await cartRepositories.addItem({
    cartId: cart.id,
    productVariantId,
    quantity,
  });

  return { cartItem };
};
