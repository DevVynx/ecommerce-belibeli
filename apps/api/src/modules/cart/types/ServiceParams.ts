import {
  AddItemToCartRequest,
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
} & AddItemToCartRequest;

export type UpdateCartItemQuantityParams = {
  userId: string;
} & UpdateCartItemQuantityRequest;

export type RemoveItemFromCartParams = {
  userId: string;
} & RemoveItemFromCartRequest;
