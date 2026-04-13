import { ZapIcon } from "lucide-react";
import { Suspense } from "react";

import { FlashSaleCarousel } from "./FlashSaleCarousel";
import { FlashSaleSkeleton } from "./FlashSaleSkeleton";
import { FlashSaleTimer } from "./FlashSaleTimer";

export const FlashSaleSection = () => {
  return (
    <section id="flashSaleSection" className="bg-neutral-100 px-3 py-12">
      <div className="mx-auto lg:container relative">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <header className="flex flex-wrap items-center gap-3">
            <ZapIcon className="h-8 w-8 rounded-full bg-black fill-current stroke-0 p-1.5 text-white" />
            <h1 className="text-lg font-bold">Ofertas Relâmpago</h1>
            <FlashSaleTimer endDate={"2030-10-08T10:00:00Z"} />
          </header>
        </div>

        <Suspense fallback={<FlashSaleSkeleton />}>
          <FlashSaleCarousel />
        </Suspense>
      </div>
    </section>
  );
};
