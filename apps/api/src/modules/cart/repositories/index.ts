import { addCartItem } from "./addItem";
import { createCart } from "./createCart";
import { deleteCartItem } from "./deleteItem";
import { existsCartByUserId } from "./existsByUserId";
import { findCartItemById } from "./findItemById";
import { findCartItemByVariantId } from "./findItemByVariantId";
import { updateCartItemQuantity } from "./updateItemQuantity";

export const cartRepositories = {
  existsByUserId: existsCartByUserId,
  create: createCart,
  addItem: addCartItem,
  findItemByVariantId: findCartItemByVariantId,
  findItemById: findCartItemById,
  updateItemQuantity: updateCartItemQuantity,
  deleteItem: deleteCartItem,
};
