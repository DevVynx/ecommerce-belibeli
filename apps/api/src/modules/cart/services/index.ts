import { createCartItem } from "./createCartItem";
import { deleteCartItem } from "./deleteCartItem";
import { getCartItems } from "./getCartItems";
import { getFullCart } from "./getFullCart";
import { updateCartItemQuantity } from "./updateCartItemQuantity";

export const cartServices = {
  getFullCart,
  getCartItems,
  createCartItem,
  updateCartItemQuantity,
  deleteCartItem,
};
