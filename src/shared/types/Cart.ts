import type { Prisma } from "@prisma/client";

export type CartInclude = Prisma.CartGetPayload<{
  include: {
    items: {
      include: { product: true; productOptions: { select: { option: true; optionValue: true } } };
    };
  };
}>;

export type CartWithCount = {
  cart: CartInclude | null;
  count: number;
};
