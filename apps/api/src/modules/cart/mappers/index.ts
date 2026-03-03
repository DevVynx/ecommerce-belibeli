import { toCartItemDto } from "./toCartItemDto";
import { toGetCartItems } from "./toItemsPreview";
import { toUserCart } from "./toUserCart";

export const cartMappers = {
  toUserCart,
  toGetCartItems,
  toCartItemDto,
};
