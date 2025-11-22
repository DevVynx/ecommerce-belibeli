import { RequestHandler } from "express";
import { cartService } from "@/modules/cart/service";
import v from "@/modules/cart/validators";

const findCart: RequestHandler = async (req, res) => {
  const { userId } = res.locals.user;
  const { cart, count, subtotal, total, discount } = await cartService.getFullCart(userId);

  return res.json({ cart, count, subtotal, total, discount });
};

const findAllCartItems: RequestHandler = async (req, res) => {
  const { userId } = res.locals.user;
  const { cartItems, count } = await cartService.getCartItems(userId);

  return res.json({ cartItems, count });
};

const addItemToCart: RequestHandler = async (req, res) => {
  const { userId } = res.locals.user;
  const { productId, productOptions, quantity } = v.addItemToCart.getValidatedValues(req).body;

  const { cartItem } = await cartService.createCartItem({
    userId,
    productId,
    quantity,
    productOptions,
  });

  return res.status(201).json({ cartItem });
};

const updateCartItemQuantity: RequestHandler = async (req, res) => {
  const { userId } = res.locals.user;
  const { cartItemId, quantity } = v.updateCartItemQuantity.getValidatedValues(req).body;

  const { cartItem } = await cartService.updateCartItemQuantity({ cartItemId, quantity, userId });

  return res.json({ cartItem });
};

const removeItemFromCart: RequestHandler = async (req, res) => {
  const { userId } = res.locals.user;
  const { cartItemId } = v.removeItemFromCart.getValidatedValues(req).body;

  await cartService.deleteCartItem({ cartItemId, userId });

  return res.status(204).send();
};

export { findCart, findAllCartItems, addItemToCart, updateCartItemQuantity, removeItemFromCart };
