"use client";

import { Header } from "@/shared/components/store/Header/Header";
import { ProductLoadError } from "@/shared/components/store/ProductLoadError";
import { useFindProducts } from "@/shared/hooks/data/useProductsQueries";

import { HeroBanner } from "../../../../../legacy/(view)/(store)/_store/components/Banner";
import { StorePageSkeleton } from "../../../../../legacy/(view)/(store)/_store/components/StorePageSkeleton";

const Home = () => {
  const { data, isLoading, isError, refetch } = useFindProducts();

  if (isLoading) {
    return <StorePageSkeleton />;
  }
  if (isError || !data) {
    return <ProductLoadError refetchAction={refetch} />;
  }

  return (
    <div className="relative z-10 overflow-x-hidden">
      <div className="relative z-10 overflow-x-hidden">
        <Header />
        <HeroBanner />
        <Main products={data.products} />
      </div>
    </div>
  );
};

export default Home;
