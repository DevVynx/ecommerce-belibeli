import { db } from "@/shared/lib/db";

export const existsWishlistByUserId = async (userId: string) => {
  const wishlist = db.wishlist.findUnique({
    where: {
      userId,
    },
    select: { id: true },
  });

  return wishlist;
};
