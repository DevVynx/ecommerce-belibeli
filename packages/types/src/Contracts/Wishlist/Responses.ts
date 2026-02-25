export type WishlistItemDto = {
  id: string;
  product: {
    id: string;
    image: string;
    title: string;
    ratingRate: number;
    ratingCount: number;
    price: number;
    salePrice: number;
    isOnSale: boolean;
    isAvailable: boolean;
  };
};

export type WishlistDto = {
  id: string;
  items: WishlistItemDto[];
};

export type GetUserWishlistResponse = {
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
