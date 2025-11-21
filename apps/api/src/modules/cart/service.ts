import { getCartSummary } from "@/modules/cart/utils/getCartSummary";
import { db } from "../../shared/lib/db";
import type {
  AddItemToCartInput,
  DeleteCartItem,
  UpdateCartItemQuantity,
} from "@/modules/cart/utils/types";
import { ConflictError, ForbiddenError, NotFoundError } from "@/shared/utils/HttpErrors";

export const getFullCart = async (userId: number) => {
  const cart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true, productOptions: { select: { option: true, optionValue: true } } },
      },
    },
  });

  if (!cart) {
    return { cart: { items: [] }, count: 0 };
  }

  const { count, discount, subtotal, total } = getCartSummary(cart);

  return { cart, count, subtotal, total, discount };
};

export const getCartItems = async (userId: number) => {
  const cartId = await db.cart.findUnique({
    where: { userId },
    select: { id: true },
  });

  const cartItems = await db.cartItem.findMany({
    where: { cartId: cartId?.id },
    include: {
      product: true,
      productOptions: { select: { option: true, optionValue: true } },
    },
  });

  if (cartItems.length === 0) {
    return { cartItems: [], count: 0 };
  }

  const { count } = getCartSummary({ items: cartItems });

  return { cartItems, count };
};

export const createCartItem = async ({
  userId,
  productId,
  options,
  quantity,
}: AddItemToCartInput) => {
  const existingCart = await db.cart.findUnique({ where: { userId } });
  const optionsPayload =
    options && options.length > 0
      ? {
          productOptions: {
            createMany: {
              data: options,
            },
          },
        }
      : {};

  if (!existingCart) {
    const { id } = await db.cart.create({ data: { userId } });
    const cartItem = await db.cartItem.create({
      data: {
        cartId: id,
        productId,
        quantity,
        ...optionsPayload,
      },
    });

    return { cartItem };
  }

  const existingItem = await db.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: existingCart.id,
        productId,
      },
    },
  });

  if (existingItem) {
    throw new ConflictError("Este item já está no carrinho.");
  }

  const cartItem = await db.cartItem.create({
    data: {
      cartId: existingCart.id,
      productId,
      quantity,
      ...optionsPayload,
    },
  });

  return { cartItem };
};

export const updateCartItemQuantity = async ({
  userId,
  cartItemId,
  quantity,
}: UpdateCartItemQuantity) => {
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
  });

  return { cartItem };
};

export const deleteCartItem = async ({ userId, cartItemId }: DeleteCartItem) => {
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

export const cartService = {
  getFullCart,
  getCartItems,
  createCartItem,
  updateCartItemQuantity,
  deleteCartItem,
};
