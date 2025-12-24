import {
  addItemToCartRequest,
  AddItemToCartResponse,
  FindAllCartItemsResponse,
  FindCartResponse,
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

const addItemToCart = async ({ productId, quantity, productOptions }: addItemToCartRequest) => {
  const response = await API.post<AddItemToCartResponse>("/cart/items", {
    productId,
    productOptions,
    quantity,
  });

  return response.data;
};

export const cartService = { findCart, findCartItems, addItemToCart };
