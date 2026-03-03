import type { GetUserWishlistResponse } from "@repo/types/contracts";

import type { EnrichedWishlist } from "@/modules/wishlist/types/Enriched";

export function toUserWishlist(wishlist: EnrichedWishlist | null): GetUserWishlistResponse {
  if (!wishlist) {
    return { wishlist: null };
  }

  return {
    wishlist: {
      id: wishlist.id,
      items: wishlist.items.map((item) => {
        const { product } = item;
        const { heroVariant } = product;

        return {
          id: item.id,
          product: {
            id: product.id,
            title: product.title,
            ratingRate: Number(product.ratingRate),
            ratingCount: product.ratingCount,
            display: {
              variantId: heroVariant.id,
              image: product.image,
              price: Number(heroVariant.price),
              salePrice: Number(heroVariant.salePrice),
              isOnSale: heroVariant.isOnSale,
              isAvailable: heroVariant.isAvailable,
            },
          },
        };
      }),
      count: wishlist.count,
    },
  };
}
