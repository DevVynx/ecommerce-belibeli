import { calculateSalePrice } from "@/modules/products/core/calculateSalePrice";
import { pickHeroVariant } from "@/modules/products/helpers/pickHeroVariant";
import type { EnrichedProductList, EnrichedVariant } from "@/modules/products/types/enriched";
import type { RawProductList } from "@/modules/products/types/persistence";

function enrichList(rawProducts: RawProductList[]): EnrichedProductList[] {
  return rawProducts
    .map((p) => enrichSingle(p))
    .filter((p): p is EnrichedProductList => p !== null);
}

function enrichSingle(product: RawProductList): EnrichedProductList | null {
  const variantsWithPrices: EnrichedVariant[] = product.productVariants.map((variant) => {
    const salePrice = calculateSalePrice(
      variant.price,
      variant.promotions,
      product.promotions,
      product.category.promotions
    );

    return {
      ...variant,
      salePrice,
      isAvailable: variant.stock > 0 && variant.isActive,
      isOnSale: salePrice.lessThan(variant.price),
    };
  });

  const heroVariant = pickHeroVariant(variantsWithPrices);

  if (!heroVariant) {
    return null;
  }

  return {
    ...product,
    heroVariant,
  };
}

export const ProductEnricher = {
  enrichList,
  enrichSingle,
};
