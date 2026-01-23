import { ArrowRightIcon } from "@/app/shared/assets/animatedIcons/arrow-right";
import { Button } from "@/app/shared/components/ui/button";
import type { AnimatedIconHandle } from "@/app/shared/types/Icon";

type MobileCartSummaryProps = {
  summary: {
    count: number;
    total: number;
    subtotal: number;
    discount: number;
  };
  getHandlers: (id: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  getIconRef: (id: string) => (ref: AnimatedIconHandle | null) => void;
};

export function MobileCartSummary({ summary, getHandlers, getIconRef }: MobileCartSummaryProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-10 flex flex-col items-center gap-2 bg-neutral-100 p-3 text-sm sm:text-base md:text-lg lg:hidden">
      <div className="w-full rounded-md bg-neutral-100 p-3">
        <div className="flex justify-between font-bold text-black/80">
          <strong>Total:</strong>
          <span>R${summary.total.toFixed(2)}</span>
        </div>
      </div>
      <Button
        {...getHandlers("arrow-mobile")}
        type="button"
        className="active:black/90 w-full rounded-lg bg-black py-3 font-bold text-white hover:bg-black/90 active:bg-black/80"
      >
        Finalizar Compra ({summary.count})
        <ArrowRightIcon ref={getIconRef("arrow-mobile")} size={25} />
      </Button>
    </div>
  );
}
