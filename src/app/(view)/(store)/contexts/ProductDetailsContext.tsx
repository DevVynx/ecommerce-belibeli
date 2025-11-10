"use client";
import type { ProductInclude } from "@/app/shared/types/Product";
import { createContext, useContext, useEffect, useState } from "react";

type ProductDetailsContextType = {
  handleOpenProductDetails: (product: ProductInclude) => void;
  selectedProduct: ProductInclude | null;
  isProductDetailsModalOpen: boolean;
  setIsProductDetailsModalOpen: (open: boolean) => void;
};

type ProductDetailsProviderType = {
  children: React.ReactNode;
};

const ProductDetailsContext = createContext<ProductDetailsContextType | null>(null);

export const ProductDetailsProvider = ({ children }: ProductDetailsProviderType) => {
  const [selectedProduct, setSelectedProduct] = useState<ProductInclude | null>(null);
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] = useState(false);

  const handleOpenProductDetails = (product: ProductInclude) => {
    setSelectedProduct(product);
    setIsProductDetailsModalOpen(true);
  };

  useEffect(() => {
    if (isProductDetailsModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isProductDetailsModalOpen]);

  return (
    <ProductDetailsContext.Provider
      value={{
        handleOpenProductDetails,
        selectedProduct,
        isProductDetailsModalOpen,
        setIsProductDetailsModalOpen,
      }}
    >
      {children}
    </ProductDetailsContext.Provider>
  );
};

export const useProductDetailsContext = () => {
  const context = useContext(ProductDetailsContext);
  if (!context)
    throw new Error("useProductDetailsContext must be used within a ProductDetailsProvider");
  return context;
};
