import { ProductCard } from "@/app/shared/components/domain/store/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./Carousel";
import { SectionHeader } from "./SectionHeader";
import { ProductCardSkeleton } from "@/app/shared/components/domain/store/ProductCardSkeleton";
import { useScreenSize } from "@/app/shared/hooks/ui/useScreenSize";
import type { ProductInclude } from "@/app/shared/types/Product";

type Props = {
  productsOnSale?: ProductInclude[];
  isLoading: boolean;
};

export function ProductsCarousel({ isLoading, productsOnSale }: Props) {
  const { isMobile } = useScreenSize();

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
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <CarouselItem key={index} className="basis-auto">
                <ProductCardSkeleton grid={false} />
              </CarouselItem>
            ))
          : productsOnSale?.map((product) => (
              <CarouselItem key={product.id} className="relative z-10 basis-auto overflow-visible">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
}
