import type { PublicProductDto } from "@repo/types/contracts";

export function getPercentDiscount(product: Pick<PublicProductDto>) {
  if (!product.promotionPrice) return 0;
  return Math.floor(
    ((Number(product.price) - Number(product.promotionPrice)) / Number(product.price)) * 100
  );
}
