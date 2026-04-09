"use client";

import { XIcon } from "lucide-react";
import { createPortal } from "react-dom";

import { Button } from "@/shared/components/shadcn-ui/button";
import { useProductDetailsContext } from "@/shared/contexts/ProductDetailsContext";

import { ProductDetails } from "./ProductDetails";

export const ProductDetailsModal = () => {
  const { setIsProductDetailsModalOpen, isProductDetailsModalOpen, selectedProduct } =
    useProductDetailsContext();

  if (!isProductDetailsModalOpen) return null;
  if (!selectedProduct) {
    return <p className="text-red-500">Falha ao carregar os detalhes do produto</p>;
  }

  return createPortal(
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-5xl rounded-md bg-white p-6 md:p-10">
        <Button
          onClick={() => setIsProductDetailsModalOpen(false)}
          className="absolute top-2 right-2 text-zinc-500"
        >
          <XIcon className="size-5" />
        </Button>
        <ProductDetails
          selectedProduct={selectedProduct}
          setIsProductDetailsModalOpenAction={setIsProductDetailsModalOpen}
        />
      </div>
    </div>,
    document.body
  );
};
