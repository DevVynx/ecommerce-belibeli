import { Prisma, ProductVariant, Promotion } from "../../../prisma/generated/client/client";

/**
 * Interface mínima necessária para uma promoção ser calculada.
 */
export type MinimalPromotion = Pick<Promotion, "type" | "discountValue">;

/**
 * Interface mínima necessária para uma variante ter seu preço e disponibilidade calculados.
 */
export type MinimalVariantPricing = Pick<ProductVariant, "price" | "stock" | "isActive">;

/**
 * Estrutura para agrupar as promoções de diferentes níveis.
 */
export interface ProductPromotionsInput {
  variant?: MinimalPromotion[];
  product?: MinimalPromotion[];
  category?: MinimalPromotion[];
}

/**
 * Resultado do cálculo de enriquecimento de uma variante.
 */
export interface ProductEnrichment {
  salePrice: Prisma.Decimal;
  isOnSale: boolean;
  isAvailable: boolean;
}

export const productLogic = {
  calculateEnrichment(
    variant: MinimalVariantPricing,
    promotions: ProductPromotionsInput
  ): ProductEnrichment {
    const basePrice = new Prisma.Decimal(variant.price);

    // Hierarquia de promoções: Variante > Produto > Categoria
    const activePromo =
      promotions.variant?.[0] || promotions.product?.[0] || promotions.category?.[0];

    const salePrice = activePromo ? this.applyDiscount(basePrice, activePromo) : basePrice;

    return {
      salePrice,
      isOnSale: salePrice.lessThan(basePrice),
      isAvailable: variant.isActive && variant.stock > 0,
    };
  },

  applyDiscount(basePrice: Prisma.Decimal, promotion: MinimalPromotion): Prisma.Decimal {
    const discountValue = new Prisma.Decimal(promotion.discountValue.toString());
    let result: Prisma.Decimal;

    if (promotion.type === "PERCENTAGE") {
      const discountPercentage = discountValue.div(100);
      const amountToSubtract = basePrice.times(discountPercentage);
      result = basePrice.minus(amountToSubtract);
    } else {
      result = basePrice.minus(discountValue);
    }

    const zero = new Prisma.Decimal(0);
    return result.lessThan(zero) ? zero : result.toDecimalPlaces(2);
  },

  pickHeroVariant<T extends ProductEnrichment & { stock: number }>(variants: T[]): T | undefined {
    const availableVariants = variants.filter((v) => v.isAvailable);

    if (availableVariants.length === 0) return undefined;

    return availableVariants.reduce((best, current) => {
      // Prioridade 1: Promoção ganha de preço normal
      if (current.isOnSale && !best.isOnSale) return current;
      if (!current.isOnSale && best.isOnSale) return best;

      // Prioridade 2: Menor preço final (salePrice) ganha
      if (current.salePrice.lessThan(best.salePrice)) return current;
      if (current.salePrice.greaterThan(best.salePrice)) return best;

      // Prioridade 3: Maior estoque como critério final de desempate
      return current.stock > best.stock ? current : best;
    });
  },
};
