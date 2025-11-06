import { ProductDetails } from "./ProductDetails";
import { IconMobileButton } from "@/shared/components/IconMobileButton";
import { XMarkIcon } from "@/assets/Icons";
import { useProductDetailsContext } from "@/app/(view)/(store)/contexts/ProductDetailsContext";

export const ProductDetailsModal = () => {
  const { setIsProductDetailsModalOpen } = useProductDetailsContext();

  return (
    <div className="fixed inset-0 z-2 flex items-center justify-center bg-black/70 p-15">
      <div className="relative w-5xl rounded-md bg-white p-10">
        <IconMobileButton
          onClick={() => setIsProductDetailsModalOpen(false)}
          className="absolute top-2 right-2 text-zinc-500"
        >
          <XMarkIcon className="size-5" />
        </IconMobileButton>
        <ProductDetails />
      </div>
    </div>
  );
};
