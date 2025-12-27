"use client";
import { StorePageSkeleton } from "@/app/(view)/(store)/_store/components/StorePageSkeleton";
import { Header } from "@/app/shared/components/store/Header/Header";
import { ProductLoadError } from "@/app/shared/components/store/ProductLoadError";
import { useFindProducts } from "@/app/shared/hooks/data/useProductsQueries";

import { HeroBanner } from "./components/Banner/HeroBanner";
import { Main } from "./components/Main/Main";

export const StorePage = () => {
  const { data, isLoading, isError, refetch } = useFindProducts();

  if (isLoading) {
    return <StorePageSkeleton />;
  }
  if (isError || !data) {
    return <ProductLoadError refetchAction={refetch} />;
  }

  return (
    <div className="relative z-10 overflow-x-hidden">
      <Header />
      <HeroBanner />
      <Main products={data.products} />
    </div>
  );
};
