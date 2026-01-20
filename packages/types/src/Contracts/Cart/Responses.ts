export type CartItemDto = {
  id: string;
  quantity: number;
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    promotionPrice: number | null;
    promotionEnd: string | null;
  };
  productOptions: {
    option: {
      id: string;
      type: string;
    };
    optionValue: {
      id: string;
      value: string;
    };
  }[];
};

export type CartDto = {
  id: string;
  items: CartItemDto[];
};

export type FindCartResponse = {
  cart: CartDto | null;
  count: number;
  subtotal: number;
  total: number;
  discount: number;
};

export type FindAllCartItemsResponse = {
  items: CartItemDto[] | [];
  count: number;
};

export type AddItemToCartResponse = {
  cartItem: {
    id: string;
    quantity: number;
    cartId: string;
    productId: string;
  };
};

export type UpdateCartItemQuantityResponse = {
  cartItem: {
    id: string;
    quantity: number;
    cartId: string;
    productId: string;
  };
};

export type RemoveItemFromCartResponse = void;
