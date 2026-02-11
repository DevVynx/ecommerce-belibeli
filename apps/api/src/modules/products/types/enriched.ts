import type { RawProductList } from "@/modules/products/types/persistence";

import type { Prisma } from "../../../../prisma/generated/client/client";

export type EnrichedProductList = Omit<RawProductList, "productVariants"> & {
  variants: (Omit<RawProductList["productVariants"][0], "promotions"> & {
    salePrice: Prisma.Decimal;
    isAvailable: boolean;
  })[];
};
