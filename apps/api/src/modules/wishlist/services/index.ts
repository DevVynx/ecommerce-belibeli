import { createWishlistItem } from "@/modules/wishlist/services/createWishlistItem";
import { deleteWishlistItem } from "@/modules/wishlist/services/deleteWishlistItem";
import { findByUserId } from "@/modules/wishlist/services/findByUserId";

export const wishlistServices = {
  findByUserId,
  createWishlistItem,
  deleteWishlistItem,
};
