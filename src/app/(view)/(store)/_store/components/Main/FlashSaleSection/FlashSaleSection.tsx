"use client";
import { useFindProducts } from "@/app/shared/hooks/data/useProductsQueries";
import { ProductsCarousel } from "./ProductsCarousel";

export const FlashSaleSection = () => {
  const { data, isLoading, isError } = useFindProducts();

  const productsOnSale = data?.products.filter((product) => {
    if (!product.promotionEnd) return false;

    const now = new Date();
    const end = new Date(product.promotionEnd);

    return now < end;
  });

  if (isError) {
    return <section className="p-12 text-center text-red-600">Erro ao carregar ofertas.</section>;
  }

  return (
    <section id="flashSaleSection" className="bg-neutral-100 px-3 py-12">
      <div className="mx-auto lg:container">
        <ProductsCarousel isLoading={isLoading} productsOnSale={productsOnSale} />
      </div>
    </section>
  );
};
