import { db } from "@/shared/lib/db";

type addWishlistItemProps = {
  wishlistId: string;
  productId: string;
};

export const addWishlistItem = async ({ wishlistId, productId }: addWishlistItemProps) => {
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
