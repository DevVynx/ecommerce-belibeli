import { db } from "@/shared/lib/db";

type createWishlistProps = {
  userId: string;
};

export const createWishlist = async ({ userId }: createWishlistProps) => {
  const wishlist = await db.wishlist.create({ data: { userId } });

  return wishlist;
};
