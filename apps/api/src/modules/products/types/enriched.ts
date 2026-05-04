import type { RawDetailedProduct, RawProduct } from "@/modules/products/types/Persistence";

import type { Decimal } from "../../../../prisma/generated/client/internal/prismaNamespace";

type EnrichedVariantBase = {
  salePrice: Decimal;
  isAvailable: boolean;
  isOnSale: boolean;
};

export type EnrichedVariant = RawProduct["productVariants"][0] & EnrichedVariantBase;

export type EnrichedProduct = RawProduct & {
  heroVariant: EnrichedVariant;
};

export type EnrichedProductList = EnrichedProduct[];

export type EnrichedDetailedVariant = NonNullable<RawDetailedProduct>["productVariants"][0] &
  EnrichedVariantBase;

export type EnrichedProductDetails = Omit<NonNullable<RawDetailedProduct>, "productVariants" | "heroVariant"> & {
  productVariants: EnrichedDetailedVariant[];
  heroVariant: EnrichedDetailedVariant;
};
