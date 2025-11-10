"use client";
import { useProductDetailsContext } from "../../../contexts/ProductDetailsContext";
import { CategoriesSection } from "./CategoriesSection/CategoriesSection";
import { FlashSaleSection } from "./FlashSaleSection/FlashSaleSection";
import { ForYouSection } from "./ForYouSection/ForYouSection";
import { ProductDetailsModal } from "../../../../../shared/components/domain/store/ProductDetailsModal/ProductDetailsModal";
import { useFindProducts } from "@/app/shared/hooks/data/useProductsQueries";
import { LoadError } from "@/app/shared/components/LoadError";
import { getProductsOnSale } from "@/app/shared/utils/product/getProductsOnSale";

export const Main = () => {
  const { data, isLoading, isError, refetch } = useFindProducts();
  const { isProductDetailsModalOpen } = useProductDetailsContext();

  if (isError)
    return (
      <main className="max-w-9xl mx-auto flex flex-col bg-white pb-14 lg:pb-0">
        <LoadError onRetry={refetch} />
      </main>
    );

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
