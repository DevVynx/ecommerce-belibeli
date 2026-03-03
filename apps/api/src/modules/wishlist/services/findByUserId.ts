import { wishlistRepositories } from "@/modules/wishlist/repositories";
import type { FindWishlistByUserIdParams } from "@/modules/wishlist/types/ServiceParams";
import { productLogic } from "@/shared/utils/productLogic";

export const findByUserId = async ({ userId }: FindWishlistByUserIdParams) => {
  const rawWishlist = await wishlistRepositories.findByUserId(userId);

  if (!rawWishlist) return { wishlist: null, count: 0 };

  const enrichedItems = rawWishlist.items
    .map((item) => {
      const enrichedVariants = item.product.productVariants.map((variant) => {
        const { isAvailable, isOnSale, salePrice } = productLogic.calculateEnrichment(variant, {
          variant: variant.promotions,
          product: item.product.promotions,
          category: item.product.category.promotions,
        });

        return {
          ...variant,
          isOnSale,
          salePrice,
          isAvailable,
        };
      });

      const heroVariant = productLogic.pickHeroVariant(enrichedVariants);
      return heroVariant
        ? {
            ...item,
            product: {
              ...item.product,
              heroVariant,
            },
          }
        : null;
    })
    .filter((item) => item != null);

  const wishlist = {
    id: rawWishlist.id,
    items: enrichedItems,
    count: enrichedItems.length,
  };

  return { wishlist };
};
