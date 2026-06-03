"use client";
import type { CatalogProductDto } from "@repo/types/contracts";
import { useEffect, useState } from "react";

import { getProducts } from "@/shared/actions/products/getProducts";
import { ProductCard } from "@/shared/components/Store/ProductCard";
import { ProductCardSkeleton } from "@/shared/components/Store/ProductCardSkeleton";

type ProductRecommendationsProps = {
  categoryId: string;
};

export const ProductRecommendations = ({ categoryId }: ProductRecommendationsProps) => {
  const [products, setProducts] = useState<CatalogProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const { data } = await getProducts({ limit: 12, categoryId });
        setProducts(data?.products || []);
      } catch (error) {
        console.error("Erro ao buscar sugestões", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [categoryId]);

  if (isLoading) {
    return (
      <section className="pb-10 lg:py-10">
        <h2 className="mb-4 text-center text-xl font-bold">Recomendações para você!</h2>
        <div className="grid grid-cols-2 gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} grid />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="pb-10 lg:py-10">
      <h2 className="mb-6 text-center text-xl font-bold">Recomendações para você!</h2>
      <div className="grid grid-cols-2 gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} grid />
        ))}
      </div>
    </section>
  );
};
