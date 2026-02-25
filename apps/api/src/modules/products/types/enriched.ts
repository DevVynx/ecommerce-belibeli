import type { RawProduct } from "@/modules/products/types/Persistence";

import type { Prisma } from "../../../../prisma/generated/client/client";

export type EnrichedVariant = RawProduct["productVariants"][0] & {
  salePrice: Prisma.Decimal;
  isAvailable: boolean;
  isOnSale: boolean;
};

export type EnrichedProduct = RawProduct & {
  heroVariant: EnrichedVariant;
};

export type EnrichedProductList = EnrichedProduct[];
