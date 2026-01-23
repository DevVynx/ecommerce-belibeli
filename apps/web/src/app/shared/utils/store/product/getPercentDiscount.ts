import type { ProductDto } from "@repo/types/contracts";

export function getPercentDiscount(product: Pick<ProductDto, "price" | "promotionPrice">) {
  if (!product.promotionPrice) return 0;
  return Math.floor(
    ((Number(product.price) - Number(product.promotionPrice)) / Number(product.price)) * 100
  );
}
