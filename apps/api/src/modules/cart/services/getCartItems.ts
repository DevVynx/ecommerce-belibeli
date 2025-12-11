import { db } from "@/shared/lib/db";
import { getCartSummary } from "@/modules/cart/utils/getCartSummary";
import { controllerCartItemsMapper } from "@/modules/cart/mappers";
import type { GetCartItemsParams } from "@/modules/cart/types/ServiceParams";

export const getCartItems = async ({ userId }: GetCartItemsParams) => {
  const cartId = await db.cart.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!cartId) {
    return { items: [], count: 0 };
  }

  const rawItems = await db.cartItem.findMany({
    where: { cartId: cartId.id },
    include: {
      product: {
        select: {
          id: true,
          title: true,
          price: true,
          image: true,
          promotionPrice: true,
          promotionEnd: true,
        },
      },
      productOptions: {
        select: {
          option: { omit: { productId: true } },
          optionValue: { omit: { productOptionId: true } },
        },
      },
    },
    omit: { productId: true, cartId: true, createdAt: true, updatedAt: true },
  });

  const items = controllerCartItemsMapper(rawItems);

  const { count } = getCartSummary({ id: cartId.id, items });

  return { items, count };
};
