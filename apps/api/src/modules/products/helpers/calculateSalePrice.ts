import { Prisma, Promotion, PromotionTypes } from "../../../../prisma/generated/client/client";

export const calculateSalePrice = (
  basePrice: Prisma.Decimal,
  variantPromos: Promotion[],
  productPromos: Promotion[],
  categoryPromos: Promotion[]
): Prisma.Decimal => {
  // 1. Tenta Variante (Maior Prioridade)
  const variantPromo = variantPromos[0];
  if (variantPromo) return applyDiscount(basePrice, variantPromo);

  // 2. Tenta Produto
  const productPromo = productPromos[0];
  if (productPromo) return applyDiscount(basePrice, productPromo);

  // 3. Tenta Categoria (Menor Prioridade)
  const categoryPromo = categoryPromos[0];
  if (categoryPromo) return applyDiscount(basePrice, categoryPromo);

  return basePrice;
};

function applyDiscount(basePrice: Prisma.Decimal, promotion: Promotion): Prisma.Decimal {
  const discountValue = new Prisma.Decimal(promotion.discountValue.toString());
  const zero = new Prisma.Decimal(0);
  let result: Prisma.Decimal;

  if (promotion.type === PromotionTypes.PERCENTAGE) {
    const discountPercentage = discountValue.div(100);
    const amountToSubtract = basePrice.times(discountPercentage);
    result = basePrice.minus(amountToSubtract);
  } else {
    result = basePrice.minus(discountValue);
  }

  return result.lessThan(zero) ? zero : result;
}
