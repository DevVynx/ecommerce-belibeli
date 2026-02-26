import { addCartItem } from "./addCartItem";
import { createCart } from "./createCart";
import { existsCartByUserId } from "./existsByUserId";
import { findCartItemByVariantId } from "./findItemByVariantId";
import { updateCartItemQuantity } from "./updateItemQuantity";

export const cartRepositories = {
  existsByUserId: existsCartByUserId,
  create: createCart,
  addItem: addCartItem,
  findItemByVariantId: findCartItemByVariantId,
  updateItemQuantity: updateCartItemQuantity,
};
