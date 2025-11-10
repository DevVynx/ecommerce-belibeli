import type { ProductInclude } from "@/app/shared/types/Product";

export function getPercentDiscount(product: ProductInclude) {
  if (!product.promotionPrice) return 0;
  return Math.floor(
    ((Number(product.price) - Number(product.promotionPrice)) / Number(product.price)) * 100,
  );
}
