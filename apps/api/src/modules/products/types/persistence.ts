import type { Prisma } from "../../../../prisma/generated/client/client";

export const ProductListInclude = {
  category: { include: { promotions: true } },
  promotions: true,
  productOptions: { include: { values: true } },
  productVariants: {
    include: {
      promotions: true,
      productVariantOptions: { select: { productOptionValueId: true } },
    },
  },
} as const;

export type RawProductList = Prisma.ProductGetPayload<{ include: typeof ProductListInclude }>;
