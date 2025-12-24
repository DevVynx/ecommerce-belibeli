export type WishlistItemDto = {
  id: string;
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    promotionPrice: number | null;
    promotionEnd: string | null;
    ratingRate: number;
    ratingCount: number;
  };
};

export type WishlistDto = {
  id: string;
  items: WishlistItemDto[];
};

export type FindWishlistResponse = {
  wishlist: WishlistDto | null;
  count: number;
};

export type AddItemToWishlistResponse = {
  wishlistItem: {
    id: string;
    wishlistId: string;
    productId: string;
  };
};

export type RemoveWishlistItemResponse = void;
