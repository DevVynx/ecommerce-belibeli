import type { findProductById } from "@/modules/products/repositories/findById";
import type { findManyProducts } from "@/modules/products/repositories/findMany";

export type RawProductList = Awaited<ReturnType<typeof findManyProducts>>;
export type RawProduct = RawProductList[0];
export type RawVariant = RawProduct["productVariants"][0];

export type RawDetailedProduct = Awaited<ReturnType<typeof findProductById>>;
export type RawDetailedVariant = NonNullable<RawDetailedProduct>["productVariants"][0];
