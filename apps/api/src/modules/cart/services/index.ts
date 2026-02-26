import { addCartItem } from "./addItem";
import { deleteCartItem } from "./deleteCartItem";
import { getCartItems } from "./getCartItems";
import { getFullCart } from "./getFullCart";
import { updateCartItemQuantity } from "./updateItemQuantity";

export const cartServices = {
  getFullCart,
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
};
