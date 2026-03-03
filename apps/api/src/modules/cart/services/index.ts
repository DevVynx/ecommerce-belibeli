import { addCartItem } from "./addItem";
import { deleteCartItem } from "./deleteCartItem";
import { findCartByIdCart } from "./findByUserId";
import { getCartItems } from "./findItemsByUserId";
import { updateCartItemQuantity } from "./updateItemQuantity";

export const cartServices = {
  findById: findCartByIdCart,
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
};
