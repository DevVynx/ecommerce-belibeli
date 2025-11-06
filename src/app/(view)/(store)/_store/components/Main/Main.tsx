"use client";
import { useProductDetailsContext } from "../../../contexts/ProductDetailsContext";
import { CategoriesSection } from "./CategoriesSection/CategoriesSection";
import { FlashSaleSection } from "./FlashSaleSection/FlashSaleSection";
import { ForYouSection } from "./ForYouSection/ForYouSection";
import { ProductDetailsModal } from "../../../components/ProductDetailsModal/ProductDetailsModal";

export const Main = () => {
  const { isProductDetailsModalOpen } = useProductDetailsContext();

  return (
    <main className="max-w-9xl mx-auto flex flex-col bg-white pb-14 lg:pb-0">
      <CategoriesSection />
      <FlashSaleSection />
      <ForYouSection />
      {isProductDetailsModalOpen && <ProductDetailsModal />}
    </main>
  );
};
