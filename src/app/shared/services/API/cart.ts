import { API } from "@/app/shared/services/API/API";
import type { CartWithCount } from "@/app/shared/types/Cart";
import type { CreateCartParams } from "@/app/shared/types/Params";
import type { CartItem } from "@prisma/client";

async function findCart() {
  const response = await API.get<CartWithCount>("/cart");
  return response.data;
}

async function createCart(params: CreateCartParams) {
  const { productID, quantity, productOptions } = params;
  const response = await API.post<CartItem>("/cartItem", { productID, quantity, productOptions });
  return response.data;
}

export const cartService = { findCart, createCart };
