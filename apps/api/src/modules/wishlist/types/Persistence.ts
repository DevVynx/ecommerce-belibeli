import type { findWishlistByUserId } from "@/modules/wishlist/repositories/findByUserId";

export type RawWishlist = Awaited<ReturnType<typeof findWishlistByUserId>>;
export type RawWishlistItem = NonNullable<RawWishlist>["items"][0];
