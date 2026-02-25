export type FindWishlistByUserIdParams = {
  userId: string;
};

export type CreateWishlistItemParams = {
  userId: string;
  productId: string;
};

export type RemoveItemFromWishlistParams = {
  userId: string;
  productId: string;
};
