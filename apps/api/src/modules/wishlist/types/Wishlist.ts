import type { findWishlistByUserId } from "@/modules/wishlist/repositories/findByUserId";
import type { ProductEnrichment } from "@/shared/utils/productLogic";

export type RawWishlist = NonNullable<Awaited<ReturnType<typeof findWishlistByUserId>>>;
export type RawWishlistItem = RawWishlist["items"][0];

export type EnrichedWishlistItem = Omit<RawWishlistItem, "product"> & {
  product: RawWishlistItem["product"] & {
    heroVariant: NonNullable<RawWishlistItem["product"]>["productVariants"][0] & { offer: ProductEnrichment };
  };
};

export type EnrichedWishlist = Omit<RawWishlist, "items"> & {
  items: EnrichedWishlistItem[];
  count: number;
};
