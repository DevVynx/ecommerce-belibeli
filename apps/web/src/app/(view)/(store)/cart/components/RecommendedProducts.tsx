"use client";
import type { ProductDto } from "@repo/types/contracts";

import { ProductCard } from "@/app/shared/components/store/ProductCard";

type RecommendedProductsProps = {
  products: ProductDto[];
};

export const RecommendedProducts = ({ products }: RecommendedProductsProps) => {
  return (
    <section className="bg-white px-3 py-12">
      <div className="mx-auto lg:container">
        <h1 className="text-center text-2xl font-bold">Você Gostaria de Preenchê-lo Com</h1>
        <section className="grid grid-cols-2 items-center justify-center gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} grid={true} />
          ))}
        </section>
      </div>
    </section>
  );
};
