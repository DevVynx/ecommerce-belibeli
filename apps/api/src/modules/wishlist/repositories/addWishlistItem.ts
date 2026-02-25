import { db } from "@/shared/lib/db";

export const addWishlistItem = async (wishlistId: string, productId: string) => {
  const wishlistItem = await db.wishlistItem.create({
    data: {
      wishlistId,
      productId,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });

  return wishlistItem;
};
