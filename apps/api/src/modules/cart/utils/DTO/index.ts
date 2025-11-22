import { CreateCartItem, UpdateCartItemQuantity, RemoveItemFromCart } from "@repo/types/contracts";

export type CreateCartItemDto = {
  userId: number;
} & CreateCartItem;

export type UpdateCartItemQuantityDto = {
  userId: number;
} & UpdateCartItemQuantity;

export type RemoveItemFromCartDto = {
  userId: number;
} & RemoveItemFromCart;
