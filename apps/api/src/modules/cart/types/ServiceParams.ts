import {
  addItemToCartRequest,
  RemoveItemFromCartRequest,
  UpdateCartItemQuantityRequest,
} from "@repo/types/contracts";

export type GetFullCartParams = {
  userId: string;
};

export type GetCartItemsParams = {
  userId: string;
};

export type CreateCartItemParams = {
  userId: string;
} & addItemToCartRequest;

export type UpdateCartItemQuantityParams = {
  userId: string;
} & UpdateCartItemQuantityRequest;

export type RemoveItemFromCartParams = {
  userId: string;
} & RemoveItemFromCartRequest;
