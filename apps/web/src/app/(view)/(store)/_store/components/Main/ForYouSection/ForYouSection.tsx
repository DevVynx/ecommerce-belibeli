import type { ProductDto } from "@repo/types/contracts";

import { ProductCard } from "@/app/shared/components/domain/store/ProductCard";

type ForYouSectionProps = {
  products: ProductDto[];
};

export const ForYouSection = ({ products }: ForYouSectionProps) => {
  return (
    <section id="forYouSection" className="px-2 py-12">
      <div className="mx-auto lg:container">
        <h1 className="text-center text-xl font-bold">Para você!</h1>

        <section className="grid grid-cols-2 gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} grid />
          ))}
        </section>
      </div>
    </section>
  );
};
