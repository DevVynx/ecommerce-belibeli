"use client";
import type { ProductDto } from "@repo/types/contracts";

import { ProductCard } from "@/app/shared/components/store/ProductCard";
import { useScreenSize } from "@/app/shared/hooks/ui/useScreenSize";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./Carousel";
import { SectionHeader } from "./SectionHeader";

type Props = {
  productsOnSale?: ProductDto[];
};

export function ProductsCarousel({ productsOnSale = [] }: Props) {
  const { isMobile } = useScreenSize();

  if (!productsOnSale || productsOnSale.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: isMobile,
      }}
      className="relative z-0 w-full"
    >
      <div className="flex justify-between">
        <SectionHeader />
        <div className="mr-4 hidden gap-3 lg:flex">
          <CarouselPrevious className="cursor-pointer rounded-md border border-black px-10 transition-colors active:bg-black active:text-white disabled:opacity-50" />
          <CarouselNext className="cursor-pointer rounded-md border border-black px-10 transition-colors active:bg-black active:text-white disabled:opacity-50" />
        </div>
      </div>

      <CarouselContent className="flex gap-4 py-10">
        {productsOnSale.map((product) => (
          <CarouselItem key={product.id} className="relative z-10 basis-auto overflow-visible">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
