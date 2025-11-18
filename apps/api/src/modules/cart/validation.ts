import { cartItemSchema } from "@/modules/cart/validationSchema.js";
import { validation } from "@/shared/utils/validation.js";

function createCartItem(data: unknown) {
  return validation({ data, schema: cartItemSchema.createCartItem });
}

function update(data: unknown) {
  return validation({ data, schema: cartItemSchema.update });
}

export const cartItemValidate = { createCartItem, update };
