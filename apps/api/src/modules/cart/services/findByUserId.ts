import { getCartSummary } from "@/modules/cart/helpers/getCartSummary";
import { cartRepositories } from "@/modules/cart/repositories";
import type { FindCartByIdParams } from "@/modules/cart/types/ServiceParams";
import { productLogic } from "@/shared/utils/productLogic";

export const findCartByIdCart = async ({ userId }: FindCartByIdParams) => {
  const rawCart = await cartRepositories.findByUserId(userId);

  if (!rawCart) {
    return {
      cart: null,
    };
  }

  const enrichedItems = rawCart.items.map((item) => {
    const { productVariant: variant } = item;

    const { isAvailable, isOnSale, salePrice } = productLogic.calculateEnrichment(variant, {
      variant: variant.promotions,
      product: variant.product.promotions,
      category: variant.product.category.promotions,
    });

    return {
      ...item,
      product: {
        ...variant.product,
        variant: {
          ...variant,
          isOnSale,
          salePrice,
          isAvailable,
        },
      },
    };
  });

  const { count, subtotal, total, discount } = getCartSummary(enrichedItems);

  const cart = {
    id: rawCart.id,
    items: enrichedItems,
    summary: {
      total,
      subtotal,
      discount,
      count,
    },
  };

  return { cart };
};
