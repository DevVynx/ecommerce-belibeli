import { getCartSummary } from "@/modules/cart/helpers/getCartSummary";
import { cartRepositories } from "@/modules/cart/repositories";
import type { GetCartItemsParams } from "@/modules/cart/types/ServiceParams";
import { productLogic } from "@/shared/utils/productLogic";

export const getCartItems = async ({ userId }: GetCartItemsParams) => {
  const rawCart = await cartRepositories.findByUserId(userId);

  if (!rawCart) {
    return { items: null, count: 0 };
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

  const { count } = getCartSummary(enrichedItems);

  return { items: enrichedItems, count };
};
