import type { CartSummary } from "@/modules/cart/helpers/getCartSummary";
import type { findCartByUserId } from "@/modules/cart/repositories/findByUserId";
import type { ProductEnrichment } from "@/shared/utils/productLogic";

export type RawCart = NonNullable<Awaited<ReturnType<typeof findCartByUserId>>>;
export type RawCartItem = RawCart["items"][0];

export type EnrichedCartItem = Omit<RawCartItem, "productVariant"> & {
  product: RawCartItem["productVariant"]["product"] & {
    variant: Omit<RawCartItem["productVariant"], "product"> & { offer: ProductEnrichment };
  };
};

export type EnrichedCart = Omit<RawCart, "items"> & {
  items: EnrichedCartItem[];
  summary: CartSummary;
};
