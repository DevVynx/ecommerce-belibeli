import type { EnrichedVariant } from "@/modules/products/types/enriched";

export function pickHeroVariant(variants: EnrichedVariant[]): EnrichedVariant | undefined {
  if (variants.length === 0) return undefined;

  return variants.reduce((best, current) => {
    // Regra 1: promoção ganha
    if (current.isOnSale && !best!.isOnSale) return current;
    if (!current.isOnSale && best!.isOnSale) return best;

    // Regra 2: Maior Estoque desempata
    if (current.stock > best!.stock) return current;

    return best;
  }, variants[0]);
}
