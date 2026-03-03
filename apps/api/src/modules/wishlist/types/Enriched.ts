import type { RawWishlist, RawWishlistItem } from "@/modules/wishlist/types/Persistence";
import type { ProductEnrichment } from "@/shared/utils/productLogic";

export type EnrichedWishlistItem = Omit<RawWishlistItem, "product"> & {
  product: RawWishlistItem["product"] & {
    heroVariant: NonNullable<RawWishlistItem["product"]>["productVariants"][0] & ProductEnrichment;
  };
};

export type EnrichedWishlist = Omit<NonNullable<RawWishlist>, "items"> & {
  items: EnrichedWishlistItem[];
  count: number;
};
