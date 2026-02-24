import { calculateSalePrice } from "@/modules/products/helpers/calculateSalePrice";
import { pickHeroVariant } from "@/modules/products/helpers/pickHeroVariant";
import { productRepositories } from "@/modules/products/repositories";
import type { EnrichedProduct, EnrichedVariant } from "@/modules/products/types/enriched";
import type { FindAllProductsParams } from "@/modules/products/types/ServicesParams";

export const findAll = async ({
  categoryId,
  limit,
  offset,
  onlyAvailable,
}: FindAllProductsParams) => {
  const rawProducts = await productRepositories.findAll({
    categoryId,
    limit,
    offset,
    onlyAvailable,
  });

  const enrichedProducts = rawProducts
    .map((p) => {
      const variantsWithPrices: EnrichedVariant[] = p.productVariants.map((variant) => {
        const salePrice = calculateSalePrice(
          variant.price,
          variant.promotions,
          p.promotions,
          p.category.promotions
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
        ...p,
        heroVariant,
      };
    })
    .filter((p): p is EnrichedProduct => p !== null);

  return { products: enrichedProducts };
};
