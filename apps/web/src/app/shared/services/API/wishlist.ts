import {
  AddItemToWishlistRequest,
  AddItemToWishlistResponse,
  FindWishlistResponse,
  RemoveItemFromWishlistRequest,
} from "@repo/types/contracts";

import { API } from "@/app/shared/services/API/API";

const findWishlist = async () => {
  const response = await API.get<FindWishlistResponse>("/wishlist");

  return response.data;
};

const addItemToWishlist = async ({ productId }: AddItemToWishlistRequest) => {
  const response = await API.post<AddItemToWishlistResponse>("/wishlist/items", { productId });

  return response.data;
};

const removeItemToWishlist = async ({ wishlistItemId }: RemoveItemFromWishlistRequest) => {
  await API.delete(`/wishlist/items/${wishlistItemId}`);
};

export const wishlistService = { findWishlist, addItemToWishlist, removeItemToWishlist };
