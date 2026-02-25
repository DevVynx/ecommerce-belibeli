import type { findManyProducts } from "@/modules/products/repositories/findMany";

export type RawProductList = Awaited<ReturnType<typeof findManyProducts>>;
export type RawProduct = RawProductList[0];
export type RawVariant = RawProduct["productVariants"][0];
export type RawCategory = RawProduct["category"];
