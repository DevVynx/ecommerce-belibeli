"use client";
import type { CatalogProductDto } from "@repo/types/contracts";

import { getProducts } from "@/shared/actions/products/getProducts";
import { ProductCard } from "@/shared/components/Store/ProductCard";
import { ProductCardSkeleton } from "@/shared/components/Store/ProductCardSkeleton";
import {
  type PaginatePayload,
  useInfScrollPagination,
} from "@/shared/hooks/data/useInfScrollPagination";
import { useScreenSize } from "@/shared/hooks/ui/useScreenSize";

type ForYouSectionContentProps = {
  products: CatalogProductDto[];
};

export const ForYouSectionContent = ({ products }: ForYouSectionContentProps) => {
  const { isMobile } = useScreenSize();
  const limit = isMobile ? 9 : 16;

  const loadForYouProducts = async (
    offset: number,
    limit: number
  ): PaginatePayload<CatalogProductDto> => {
    const { data, error } = await getProducts({ limit, offset });
    if (!data || error) return { items: [], hasMore: false };
    return {
      items: data.products,
      hasMore: data.pagination.hasMore,
      total: data.pagination.total,
    };
  };

  const { items, isLoading, hasMore, sentinelRef } = useInfScrollPagination({
    action: loadForYouProducts,
    limit,
    initialItems: products,
    initialHasMore: true,
  });

  return (
    <section id="forYouSection" className="px-2 py-12">
      <div className="mx-auto lg:container">
        <h1 className="text-center text-xl font-bold">Para você!</h1>

        <div className="grid grid-cols-2 gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} grid />
          ))}
        </div>

        {hasMore && <div ref={sentinelRef} />}

        {isLoading && (
          <div className="grid grid-cols-2 gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: limit }).map((_, index) => (
              <ProductCardSkeleton key={index} grid />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
