"use client";
import { useFindProducts } from "@/app/shared/hooks/data/useProductsQueries";
import { ProductCardSkeleton } from "../../../../shared/components/domain/store/ProductCardSkeleton";
import { ProductCard } from "@/app/shared/components/domain/store/ProductCard";

export const RecommendedProducts = () => {
  const { data, isLoading, isError } = useFindProducts();

  return (
    <section className="bg-white px-3 py-12">
      <div className="mx-auto lg:container">
        <h1 className="text-center text-2xl font-bold">Você Gostaria de Preenchê-lo Com</h1>
        <section className="grid grid-cols-2 items-center justify-center gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? [...Array(12)].map((_, index) => <ProductCardSkeleton key={index} grid={true} />)
            : data?.products?.map((product) => (
                <ProductCard key={product.id} product={product} grid={true} />
              ))}
        </section>
      </div>
    </section>
  );
};
