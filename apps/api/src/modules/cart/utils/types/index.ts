export type CartItemOptionInput = {
  optionId: number;
  optionValueId: number;
};

export type AddItemToCartInput = {
  userId: number;
  productId: number;
  quantity: number;
  options?: CartItemOptionInput[];
};

export type UpdateCartItemQuantity = {
  userId: number;
  cartItemId: number;
  quantity: number;
};

export type DeleteCartItem = {
  userId: number;
  cartItemId: number;
};
