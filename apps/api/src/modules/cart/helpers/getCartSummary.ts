import { Decimal } from "../../../../prisma/generated/client/internal/prismaNamespace";

export interface CartItemSummaryInput {
  quantity: number;
  product: {
    variant: {
      price: Decimal;
      salePrice: Decimal;
    };
  };
}

export type CartSummary = {
  count: number;
  subtotal: Decimal;
  total: Decimal;
  discount: Decimal;
};

export function getCartSummary(items: CartItemSummaryInput[]): CartSummary {
  const zero = new Decimal(0);

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    return acc.plus(item.product.variant.price.times(item.quantity));
  }, zero);

  const total = items.reduce((acc, item) => {
    return acc.plus(item.product.variant.salePrice.times(item.quantity));
  }, zero);

  const discount = subtotal.minus(total);

  return {
    count,
    subtotal,
    total,
    discount,
  };
}
