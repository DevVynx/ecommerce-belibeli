import type { GetUserWishlistResponse } from "@repo/types/contracts";

import type { EnrichedWishlist } from "@/modules/wishlist/types/Wishlist";

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
            slug: product.slug,
            title: product.title,
            ratingRate: Number(product.ratingRate),
            ratingCount: product.ratingCount,
            display: {
              variantId: heroVariant.id,
              image: product.productVariants[0]?.images[0]?.url ?? "",
              price: Number(heroVariant.price),
              salePrice: Number(heroVariant.offer.salePrice),
              isOnSale: heroVariant.offer.isOnSale,
              isAvailable: heroVariant.offer.isAvailable,
            },
          },
        };
      }),
      count: wishlist.count,
    },
  };
}
