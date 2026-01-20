import {
  AddItemToCartRequest,
  AddItemToCartResponse,
  FindAllCartItemsResponse,
  FindCartResponse,
  type RemoveItemFromCartRequest,
  type UpdateCartItemQuantityRequest,
  type UpdateCartItemQuantityResponse,
} from "@repo/types/contracts";

import { API } from "@/app/shared/services/API/API";

const findCart = async () => {
  const response = await API.get<FindCartResponse>("/cart");

  return response.data;
};

const findCartItems = async () => {
  const response = await API.get<FindAllCartItemsResponse>("/cart/items");

  return response.data;
};

const addItemToCart = async ({ productId, quantity, productOptions }: AddItemToCartRequest) => {
  const response = await API.post<AddItemToCartResponse>("/cart/items", {
    productId,
    productOptions,
    quantity,
  });

  return response.data;
};

const updateCartItemQuantity = async ({ cartItemId, quantity }: UpdateCartItemQuantityRequest) => {
  const response = await API.patch<UpdateCartItemQuantityResponse>(
    `/cart/items/${cartItemId}/quantity`,
    {
      cartItemId,
      quantity,
    }
  );

  return response.data;
};

const removeItemFromCart = async ({ cartItemId }: RemoveItemFromCartRequest) => {
  await API.delete(`/cart/items/${cartItemId}`);
};

export const cartService = {
  findCart,
  findCartItems,
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
};
