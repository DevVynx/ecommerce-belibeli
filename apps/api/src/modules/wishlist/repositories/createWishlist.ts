import { db } from "@/shared/lib/db";

export const createWishlist = async (userId: string) => {
  const wishlist = await db.wishlist.create({ data: { userId } });

  return wishlist;
};
