import { controllerFullCartMapper } from "@/modules/cart/mappers";
import type { GetFullCartParams } from "@/modules/cart/types/ServiceParams";
import { getCartSummary } from "@/modules/cart/utils/getCartSummary";
import { db } from "@/shared/lib/db";

export const getFullCart = async ({ userId }: GetFullCartParams) => {
  const rawCart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: {
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
        omit: {
          productId: true,
          cartId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    omit: { userId: true, createdAt: true, updatedAt: true },
  });

  const cart = controllerFullCartMapper(rawCart);

  if (cart === null) {
    return {
      cart: null,
      count: 0,
      subtotal: 0,
      total: 0,
      discount: 0,
    };
  }

  const { count, discount, subtotal, total } = getCartSummary(cart);

  return { cart, count, subtotal, total, discount };
};
