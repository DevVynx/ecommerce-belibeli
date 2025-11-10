import { ProductDetails } from "./ProductDetails";
import { IconMobileButton } from "@/app/shared/components/IconMobileButton";
import { useProductDetailsContext } from "@/app/(view)/(store)/contexts/ProductDetailsContext";
import { XIcon } from "lucide-react";

export const ProductDetailsModal = () => {
  const { setIsProductDetailsModalOpen } = useProductDetailsContext();

  return (
    <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/70 p-15">
      <div className="relative w-5xl rounded-md bg-white p-10">
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
