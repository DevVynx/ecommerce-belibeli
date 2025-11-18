import { RequestHandler } from "express";
import { handleError } from "@/shared/utils/handleError.js";
import { handleResponse } from "@/shared/utils/handleResponse.js";
import { cartService } from "@/modules/cart/service.js";
import { toValidPositiveNumber } from "@repo/utils";

const findCart: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.user;

    const { cart, count, subtotal, total, discount } = await cartService.getFullCart(userId);

    return res.json({ cart, count, subtotal, total, discount });
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

const findAllCartItems: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.user;

    const { cartItems, count } = await cartService.getCartItems(userId);

    return res.json({ cartItems, count });
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

const addItemToCart: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const productOptions = req.body.productOptions;

    const { cartItem } = await cartService.createCartItem({
      userId,
      productId,
      quantity,
      options: productOptions,
    });
    return res.status(201).json({ cartItem });
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

const updateCartItemQuantity: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const cartItemId = toValidPositiveNumber(req.params.cartItemId);
    const quantity = toValidPositiveNumber(req.body.quantity);

    if (!cartItemId || !quantity) {
      return res.status(400).json({ message: "ID do item do carrinho inválido." });
    }

    const { cartItem } = await cartService.updateCartItemQuantity({ cartItemId, quantity, userId });

    return res.json({ cartItem });
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

const removeItemFromCart: RequestHandler = async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const cartItemId = toValidPositiveNumber(req.params.cartItemId);

    if (!cartItemId) {
      return res.status(400).json({ message: "ID do item do carrinho inválido." });
    }

    await cartService.deleteCartItem({ cartItemId, userId });
    return res.status(204).send();
  } catch (error) {
    const dataResponse = handleError(error);
    return handleResponse(res, dataResponse);
  }
};

export { findCart, findAllCartItems, addItemToCart, updateCartItemQuantity, removeItemFromCart };
