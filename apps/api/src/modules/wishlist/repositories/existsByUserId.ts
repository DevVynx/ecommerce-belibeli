import { db } from "@/shared/lib/db";

type existsWishlistByUserIdProps = {
  userId: string;
};

export const existsWishlistByUserId = async ({ userId }: existsWishlistByUserIdProps) => {
  const wishlist = db.wishlist.findUnique({
    where: {
      userId,
    },
    select: { id: true },
  });

  return wishlist;
};
