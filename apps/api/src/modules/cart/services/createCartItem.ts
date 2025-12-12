import type { CreateCartItemParams } from "@/modules/cart/types/ServiceParams";
import { db } from "@/shared/lib/db";
import { BadRequestError, NotFoundError } from "@/shared/utils/HttpErrors";
import { buildVariantHash } from "@/shared/utils/variantHash";

export const createCartItem = async ({
  userId,
  productId,
  productOptions,
  quantity,
}: CreateCartItemParams) => {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { productOptions: { include: { values: true } } },
  });

  if (!product) {
    throw new NotFoundError("Produto não encontrado.");
  }

  if (productOptions.length > 0) {
    const optionMap = new Map(
      product.productOptions.map((o) => [
        o.id,
        new Set(o.values.map((v) => v.id)),
      ])
    );

    productOptions.forEach(({ optionId, optionValueId }) => {
      const allowed = optionMap.get(optionId);
      if (!allowed) throw new BadRequestError(`optionId inválido: ${optionId}`);
      if (!allowed.has(optionValueId))
        throw new BadRequestError(`optionValueId inválido: ${optionValueId}`);
    });
  }

  const existingCart = await db.cart.findUnique({ where: { userId } });

  const variantHash = buildVariantHash(productId, productOptions);

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
        variantHash,
        quantity,
        ...optionsPayload,
      },
      omit: { createdAt: true, updatedAt: true },
    });

    return { cartItem };
  }

  const existingItem = await db.cartItem.findUnique({
    where: {
      cartId_productId_variantHash: {
        cartId: existingCart.id,
        productId,
        variantHash,
      },
    },
    omit: { createdAt: true, updatedAt: true },
  });

  if (existingItem) {
    await db.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
    return { cartItem: existingItem };
  }

  const cartItem = await db.cartItem.create({
    data: {
      cartId: existingCart.id,
      productId,
      variantHash,
      quantity,
      ...optionsPayload,
    },
    omit: { createdAt: true, updatedAt: true },
  });

  return { cartItem };
};
