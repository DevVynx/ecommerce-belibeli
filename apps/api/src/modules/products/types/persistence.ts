import type { Prisma } from "../../../../prisma/generated/client/client";

export const ProductListInclude = {
  include: {
    category: {
      include: {
        promotions: true,
      },
    },
    promotions: true,
    productVariants: {
      select: {
        id: true,
        price: true,
        stock: true,
        isActive: true,
        promotions: true,
      },
    },
  },
} as const;

export type RawProductList = Prisma.ProductGetPayload<typeof ProductListInclude>;
