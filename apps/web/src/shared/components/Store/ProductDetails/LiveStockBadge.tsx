"use client";
import { useProductVariantContext } from "@/shared/context/ProductVariantContext";

import { StockBadge } from "../StockBadge";

export const LiveStockBadge = () => {
  const { currentStock } = useProductVariantContext();
  return <StockBadge stock={currentStock} />;
};
