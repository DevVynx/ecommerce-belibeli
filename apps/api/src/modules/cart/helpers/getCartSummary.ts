import type { CartDto } from "@repo/types/contracts";

type CartSummary = {
  count: number;
  subtotal: number;
  total: number;
  discount: number;
};

const round = (value: number) => Math.round(value * 100) / 100;

export function getCartSummary(cart: CartDto): CartSummary {
  const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = round(
    cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  const total = round(
    cart.items.reduce((acc, item) => {
      const price = item.product.promotionPrice ?? item.product.price;
      return acc + price * item.quantity;
    }, 0)
  );

  const discount = round(subtotal - total);

  return { count, subtotal, total, discount };
}
