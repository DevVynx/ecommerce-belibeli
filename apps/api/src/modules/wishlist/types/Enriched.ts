import type { EnrichedProduct } from "@/modules/products/types/Enriched";
import type { RawWishlist, RawWishlistItem } from "@/modules/wishlist/types/Persistence";

export type EnrichedWishlistItem = Omit<RawWishlistItem, "product"> & {
  product: EnrichedProduct;
};

export type EnrichedWishlist = Omit<NonNullable<RawWishlist>, "items"> & {
  items: EnrichedWishlistItem[];
};
