import { ProductEnricher } from "@/modules/products/helpers/productEnricher";
import { wishlistRepositories } from "@/modules/wishlist/repositories";
import type { EnrichedWishlistItem } from "@/modules/wishlist/types/Enriched";
import type { FindWishlistByUserIdParams } from "@/modules/wishlist/types/ServiceParams";

export const findByUserId = async ({ userId }: FindWishlistByUserIdParams) => {
  const rawWishlist = await wishlistRepositories.findByUserId(userId);

  if (!rawWishlist) return { wishlist: null, count: 0 };

  const enrichedItems = rawWishlist.items
    .map((item) => {
      const enrichedProduct = ProductEnricher.enrichSingle(item.product);

      return enrichedProduct ? { ...item, product: enrichedProduct } : null;
    })
    .filter((item): item is EnrichedWishlistItem => item != null);

  return { wishlist: { ...rawWishlist, items: enrichedItems }, count: enrichedItems.length };
};
