import { controllerWishlistMapper } from "@/modules/wishlist/mappers";
import type { FindWishlistByIdParams } from "@/modules/wishlist/types/ServiceParams";
import { db } from "@/shared/lib/db";

export const findById = async ({ userId }: FindWishlistByIdParams) => {
  const rawWishlist = await db.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              price: true,
              image: true,
              promotionPrice: true,
              promotionEnd: true,
              ratingRate: true,
              ratingCount: true,
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

  const wishlist = controllerWishlistMapper(rawWishlist);

  if (!wishlist) {
    return {
      wishlist: null,
      count: 0,
    };
  }

  const count = wishlist.items.length;

  return { wishlist, count };
};
