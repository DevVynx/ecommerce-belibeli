import { ProductsCarousel } from "./ProductsCarousel";
import type { ProductInclude } from "@/app/shared/types/Product";

type FlashSaleSectionProps = {
  products: ProductInclude[] | undefined;
  isLoading: boolean;
};

export const FlashSaleSection = ({ products, isLoading }: FlashSaleSectionProps) => {
  return (
    <section id="flashSaleSection" className="bg-neutral-100 px-3 py-12">
      <div className="mx-auto lg:container">
        <ProductsCarousel isLoading={isLoading} productsOnSale={products} />
      </div>
    </section>
  );
};
