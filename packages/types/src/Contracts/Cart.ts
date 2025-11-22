type Options = {
  optionId: number;
  optionValueId: number;
};

export type CreateCartItem = {
  productId: number;
  productOptions: Options[];
  quantity: number;
};

export type UpdateCartItemQuantity = {
  cartItemId: number;
  quantity: number;
};

export type RemoveItemFromCart = {
  cartItemId: number;
};
