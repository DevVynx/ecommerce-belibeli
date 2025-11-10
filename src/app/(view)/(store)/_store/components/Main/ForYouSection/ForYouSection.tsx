"use client";
import { useFindProducts } from "@/shared/hooks/data/useProductsQueries";
import { ProductCard } from "../../../../components/ProductCard";
import { ProductCardSkeleton } from "../../../../components/ProductCardSkeleton";

export const ForYouSection = () => {
  const { data, isLoading } = useFindProducts()

  return (
    <section id="forYouSection" className="px-3 py-12">
      <div className="mx-auto lg:container">
        <h1 className="text-center text-xl font-bold">Para você!</h1>
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
