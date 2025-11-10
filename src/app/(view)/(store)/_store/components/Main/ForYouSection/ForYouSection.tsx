import { ProductCardSkeleton } from "../../../../../../shared/components/domain/store/ProductCardSkeleton";
import { ProductCard } from "@/app/shared/components/domain/store/ProductCard";
import type { ProductInclude } from "@/app/shared/types/Product";

type ForYouSectionProps = {
  products: ProductInclude[] | undefined;
  isLoading: boolean;
};

export const ForYouSection = ({ products, isLoading }: ForYouSectionProps) => {
  return (
    <section id="forYouSection" className="px-3 py-12">
      <div className="mx-auto lg:container">
        <h1 className="text-center text-xl font-bold">Para você!</h1>
        <section className="grid grid-cols-2 items-center justify-center gap-6 py-10 md:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? [...Array(12)].map((_, index) => <ProductCardSkeleton key={index} grid={true} />)
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} grid={true} />
              ))}
        </section>
      </div>
    </section>
  );
};
