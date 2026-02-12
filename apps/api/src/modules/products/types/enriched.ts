import type { RawProductList } from "@/modules/products/types/persistence";

import type { Prisma } from "../../../../prisma/generated/client/client";

export type EnrichedVariant = RawProductList["productVariants"][0] & {
  salePrice: Prisma.Decimal;
  isAvailable: boolean;
  isOnSale: boolean;
};

export type EnrichedProductList = Omit<RawProductList, "productVariants"> & {
  heroVariant: EnrichedVariant;
};
