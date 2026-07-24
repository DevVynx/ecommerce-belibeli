"use client";
import { useProductVariantContext } from "@/shared/context/ProductVariantContext";

import { ProductGallery } from "./ProductGallery";

type ProductGallerySectionProps = {
  title: string;
};

export const ProductGallerySection = ({ title }: ProductGallerySectionProps) => {
  const { selectedVariant } = useProductVariantContext();
  const images = selectedVariant?.images?.map((img) => img.url) ?? [];

  if (images.length === 0) {
    return (
      <div className="bg-muted flex aspect-square items-center justify-center rounded-lg">
        <span className="text-muted-foreground text-sm">Sem imagens</span>
      </div>
    );
  }

  return <ProductGallery key={selectedVariant?.id ?? "no-variant"} images={images} title={title} />;
};
