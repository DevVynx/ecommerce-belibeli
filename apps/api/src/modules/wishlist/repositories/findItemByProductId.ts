import { db } from "@/shared/lib/db";

type findWishlistItemByProductIdProps = {
  wishlistId: string;
  productId: string;
};

export const findWishlistItemByProductId = async ({
  wishlistId,
  productId,
}: findWishlistItemByProductIdProps) => {
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
