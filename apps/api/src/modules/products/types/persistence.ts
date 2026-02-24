import type { findAllProducts } from "@/modules/products/repositories/findAllProducts";

export type RawProductList = Awaited<ReturnType<typeof findAllProducts>>;
export type RawProduct = RawProductList[0];
export type RawVariant = RawProduct["productVariants"][0];
export type RawCategory = RawProduct["category"];
