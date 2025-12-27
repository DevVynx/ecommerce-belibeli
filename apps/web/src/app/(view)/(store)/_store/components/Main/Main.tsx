"use client";
import type { FindAllProductsResponse } from "@repo/types/contracts";

import { useProductDetailsContext } from "@/app/shared/contexts/ProductDetailsContext";
import { getProductsOnSale } from "@/app/shared/utils/product/getProductsOnSale";

import { ProductDetailsModal } from "../../../../../shared/components/store/ProductDetailsModal/ProductDetailsModal";
import { CategoriesSection } from "./CategoriesSection/CategoriesSection";
import { FlashSaleSection } from "./FlashSaleSection/FlashSaleSection";
import { ForYouSection } from "./ForYouSection/ForYouSection";

type MainProps = {
  products: FindAllProductsResponse["products"];
};

export const Main = ({ products }: MainProps) => {
  const { isProductDetailsModalOpen } = useProductDetailsContext();
  const productsOnSale = getProductsOnSale(products);

  return (
    <main className="max-w-9xl mx-auto flex flex-col bg-white pb-14 lg:pb-0">
      <CategoriesSection />
      <FlashSaleSection products={productsOnSale} />
      <ForYouSection products={products} />
      {isProductDetailsModalOpen && <ProductDetailsModal />}
    </main>
  );
};
