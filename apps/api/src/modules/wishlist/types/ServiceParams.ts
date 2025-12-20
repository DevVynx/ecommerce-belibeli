export type FindWishlistByIdParams = {
  userId: string;
};

export type CreateWishlistItemParams = {
  userId: string;
  productId: string;
};

export type RemoveItemFromWishlistParams = {
  userId: string;
  wishlistItemId: string;
};
