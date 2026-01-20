export type OptionsDto = {
  optionId: string;
  optionValueId: string;
};

export type AddItemToCartRequest = {
  productId: string;
  productOptions: OptionsDto[];
  quantity: number;
};

export type UpdateCartItemQuantityRequest = {
  cartItemId: string;
  quantity: number;
};

export type RemoveItemFromCartRequest = {
  cartItemId: string;
};
