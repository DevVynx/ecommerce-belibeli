import { db } from "@/app/shared/lib/db";
import { ConflictError } from "../../HttpErrors";

export type OptionInput = { optionId: number; optionValueId: number };

type CreateParams = {
  userId: number;
  productId: number;
  productOptions: OptionInput[];
  quantity: number;
};

export async function create({ userId, productId, productOptions, quantity }: CreateParams) {
  const existingCart = await db.cart.findUnique({ where: { userId } });
  const optionsPayload =
    productOptions && productOptions.length > 0
      ? {
          productOptions: {
            createMany: {
              data: productOptions,
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
}

type UpdateParams = {
  cartItemId: number;
  quantity: number;
};

export async function update({ cartItemId, quantity }: UpdateParams) {
  const cartItem = await db.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: { increment: quantity } },
  });

  return { cartItem };
}

export const cartItemService = { create, update };
