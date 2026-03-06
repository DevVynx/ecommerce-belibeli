import { db } from "@/shared/lib/db";

type findWishlistByUserIdProps = {
  userId: string;
};

export const findWishlistByUserId = async ({ userId }: findWishlistByUserIdProps) => {
  const now = new Date();

  const rawWishlist = await db.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              category: {
                select: {
                  promotions: {
                    where: {
                      isActive: true,
                      startsAt: { lte: now },
                      endsAt: { gte: now },
                    },
                  },
                },
              },
              promotions: {
                where: {
                  isActive: true,
                  startsAt: { lte: now },
                  endsAt: { gte: now },
                },
              },
              productVariants: {
                select: {
                  id: true,
                  price: true,
                  stock: true,
                  isActive: true,
                  promotions: {
                    where: { isActive: true, startsAt: { lte: now }, endsAt: { gte: now } },
                  },
                },
              },
            },
          },
        },
        omit: {
          productId: true,
          wishlistId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    omit: {
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  });

  return rawWishlist;
};
