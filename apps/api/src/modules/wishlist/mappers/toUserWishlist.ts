import type { EnrichedWishlist } from "@/modules/wishlist/types/Enriched";

export function wishlistMapperToUserWishlist(wishlist: EnrichedWishlist | null) {
  if (!wishlist) {
    return null;
  }

  return {
    id: wishlist.id,
    items: wishlist.items.map((item) => {
      const { product } = item;
      const { heroVariant } = product;

      return {
        id: item.id,
        product: {
          id: product.id,
          image: product.image,
          title: product.title,
          ratingRate: Number(product.ratingRate),
          ratingCount: product.ratingCount,
          price: Number(heroVariant.price),
          salePrice: Number(heroVariant.salePrice),
          isOnSale: heroVariant.isOnSale,
          isAvailable: heroVariant.isAvailable,
        },
      };
    }),
  };
}
