import { addWishlistItem } from "@/modules/wishlist/repositories/addWishlistItem";
import { createWishlist } from "@/modules/wishlist/repositories/createWishlist";
import { existsWishlistByUserId } from "@/modules/wishlist/repositories/existsByUserId";
import { findWishlistByUserId } from "@/modules/wishlist/repositories/findByUserId";
import { findWishlistItemByProductId } from "@/modules/wishlist/repositories/findItemByProductId";

export const wishlistRepositories = {
  findByUserId: findWishlistByUserId,
  existsByUserId: existsWishlistByUserId,
  create: createWishlist,
  addItem: addWishlistItem,
  findItemByProductId: findWishlistItemByProductId,
};
