import type { CartSummary } from "@/modules/cart/helpers/getCartSummary";
import type { RawCart, RawCartItem } from "@/modules/cart/types/Persistence";
import type { ProductEnrichment } from "@/shared/utils/productLogic";

export type EnrichedCartItem = Omit<RawCartItem, "productVariant"> & {
  product: RawCartItem["productVariant"]["product"] & {
    variant: Omit<RawCartItem["productVariant"], "product"> & ProductEnrichment;
  };
};

export type EnrichedCart = Omit<NonNullable<RawCart>, "items"> & {
  items: EnrichedCartItem[];
  summary: CartSummary;
};
