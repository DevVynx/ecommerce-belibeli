import type { RawProduct } from "@/modules/products/types/Persistence";

import type { Decimal } from "../../../../prisma/generated/client/internal/prismaNamespace";

export type EnrichedVariant = RawProduct["productVariants"][0] & {
  salePrice: Decimal;
  isAvailable: boolean;
  isOnSale: boolean;
};

export type EnrichedProduct = RawProduct & {
  heroVariant: EnrichedVariant;
};

export type EnrichedProductList = EnrichedProduct[];
