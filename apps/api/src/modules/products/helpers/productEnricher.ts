import { calculateSalePrice } from "@/modules/products/helpers/calculateSalePrice";
import { pickHeroVariant } from "@/modules/products/helpers/pickHeroVariant";
import type { EnrichedProduct, EnrichedVariant } from "@/modules/products/types/Enriched";
import type { RawProduct } from "@/modules/products/types/Persistence";

export const ProductEnricher = {
  enrichSingle(product: RawProduct): EnrichedProduct | null {
    if (!product.productVariants || product.productVariants.length === 0) {
      return null;
    }

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
      productVariants: variantsWithPrices,
      heroVariant,
    };
  },

  enrichMany(products: RawProduct[]): EnrichedProduct[] {
    return products
      .map((product) => ProductEnricher.enrichSingle(product))
      .filter((p): p is EnrichedProduct => p !== null);
  },
};
