"use client";
import { ProductLoadError } from "@/app/shared/components/domain/store/ProductLoadError";
import { useProductDetailsContext } from "@/app/shared/contexts/ProductDetailsContext";
import { useFindProducts } from "@/app/shared/hooks/data/useProductsQueries";
import { getProductsOnSale } from "@/app/shared/utils/product/getProductsOnSale";

import { ProductDetailsModal } from "../../../../../shared/components/domain/store/ProductDetailsModal/ProductDetailsModal";
import { CategoriesSection } from "./CategoriesSection/CategoriesSection";
import { FlashSaleSection } from "./FlashSaleSection/FlashSaleSection";
import { ForYouSection } from "./ForYouSection/ForYouSection";

export const Main = () => {
  const { data, isLoading, isError, refetch } = useFindProducts();
  const { isProductDetailsModalOpen } = useProductDetailsContext();

  if (isError) {
    return (
      <main className="max-w-9xl mx-auto flex flex-col bg-white pb-14 lg:pb-0">
        <ProductLoadError onRetryAction={refetch} />
      </main>
    );
  }

  const productsOnSale = getProductsOnSale(data?.products);

  return (
    <main className="max-w-9xl mx-auto flex flex-col bg-white pb-14 lg:pb-0">
      <CategoriesSection />
      <FlashSaleSection products={productsOnSale} isLoading={isLoading} />
      <ForYouSection products={data?.products} isLoading={isLoading} />
      {isProductDetailsModalOpen && <ProductDetailsModal />}
    </main>
  );
};
