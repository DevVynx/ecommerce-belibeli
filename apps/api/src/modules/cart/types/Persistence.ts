import type { findCartByUserId } from "@/modules/cart/repositories/findByUserId";

export type RawCart = Awaited<ReturnType<typeof findCartByUserId>>;
export type RawCartItem = NonNullable<RawCart>["items"][0];
