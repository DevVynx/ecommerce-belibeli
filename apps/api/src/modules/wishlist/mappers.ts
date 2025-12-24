import { WishlistDto } from "@repo/types/contracts";

import type { Decimal } from "../../../prisma/generated/client/internal/prismaNamespace";

type RawWishlistItem = {
  id: string;
  product: {
    id: string;
    title: string;
    price: Decimal;
    image: string;
    promotionPrice: Decimal | null;
    promotionEnd: Date | null;
    ratingRate: Decimal;
    ratingCount: number;
  };
};

type RawWishlist = {
  id: string;
  items: RawWishlistItem[];
} | null;

export const controllerWishlistMapper = (
  rawWishlist: RawWishlist
): WishlistDto | null => {
  if (!rawWishlist) return null;

  return {
    id: rawWishlist.id,
    items: rawWishlist.items.map((item) => ({
      id: item.id,
      product: {
        id: item.product.id,
        title: item.product.title,
        image: item.product.image,
        price: Number(item.product.price),
        promotionPrice: item.product.promotionPrice
          ? Number(item.product.promotionPrice)
          : null,
        promotionEnd: item.product.promotionEnd
          ? item.product.promotionEnd.toISOString()
          : null,
        ratingRate: Number(item.product.ratingRate),
        ratingCount: item.product.ratingCount,
      },
    })),
  };
};
