const findWishlist = async () => {
  const response = await API.get<FindWishlistResponse>("/wishlist");

  return response.data;
};

const addItemToWishlist = async ({ productId }: AddItemToWishlistRequest) => {
  const response = await API.post<AddItemToWishlistResponse>("/wishlist", { productId });

  return response.data;
};

const removeItemFromWishlist = async ({ productId }: RemoveItemFromWishlistRequest) => {
  await API.delete(`/wishlist/${productId}`);
};

export const wishlistService = { findWishlist, addItemToWishlist, removeItemFromWishlist };
