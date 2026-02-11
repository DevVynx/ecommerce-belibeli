import { Prisma, Promotion, PromotionTypes } from "../../../../prisma/generated/client/client";

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

function findFirstActive(promotions: Promotion[]): Promotion | undefined {
  const now = new Date();
  return promotions.find((p) => {
    const start = new Date(p.startsAt);
    const end = new Date(p.endsAt);
    return p.isActive && now >= start && now <= end;
  });
}

export const calculateSalePrice = (
  basePrice: Prisma.Decimal,
  variantPromos: Promotion[],
  productPromos: Promotion[],
  categoryPromos: Promotion[]
): Prisma.Decimal => {
  // 1. Tenta Variante (Maior Prioridade)
  const variantPromo = findFirstActive(variantPromos);
  if (variantPromo) return applyDiscount(basePrice, variantPromo);

  // 2. Tenta Produto
  const productPromo = findFirstActive(productPromos);
  if (productPromo) return applyDiscount(basePrice, productPromo);

  // 3. Tenta Categoria (Menor Prioridade)
  const categoryPromo = findFirstActive(categoryPromos);
  if (categoryPromo) return applyDiscount(basePrice, categoryPromo);

  return basePrice;
};
