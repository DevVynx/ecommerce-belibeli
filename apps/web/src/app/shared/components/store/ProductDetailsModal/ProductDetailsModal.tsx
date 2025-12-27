"use client";

import { XIcon } from "lucide-react";

import { IconMobileButton } from "@/app/shared/components/IconMobileButton";
import { useProductDetailsContext } from "@/app/shared/contexts/ProductDetailsContext";

import { ProductDetails } from "./ProductDetails";

export const ProductDetailsModal = () => {
  const { setIsProductDetailsModalOpen, isProductDetailsModalOpen } = useProductDetailsContext();

  if (!isProductDetailsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-5xl rounded-md bg-white p-6 md:p-10">
        <IconMobileButton
          onClick={() => setIsProductDetailsModalOpen(false)}
          className="absolute top-2 right-2 text-zinc-500"
        >
          <XIcon className="size-5" />
        </IconMobileButton>

        <ProductDetails />
      </div>
    </div>
  );
};
