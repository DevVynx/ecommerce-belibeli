import { db } from "@/shared/lib/db";

export const findWishlistItemByProductId = async (wishlistId: string, productId: string) => {
  const wishlistItem = await db.wishlistItem.findUnique({
    where: {
      wishlistId_productId: {
        wishlistId,
        productId,
      },
    },
  });

  return wishlistItem;
};
