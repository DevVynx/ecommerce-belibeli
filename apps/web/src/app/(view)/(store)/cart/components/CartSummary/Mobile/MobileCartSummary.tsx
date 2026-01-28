import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { AppliedCouponItem } from "@/app/(view)/(store)/cart/components/CartSummary/AppliedCouponItem";
import { MobCouponApplier } from "@/app/(view)/(store)/cart/components/CartSummary/Mobile/MobCouponApplier";
import { MobDeliveryDestination } from "@/app/(view)/(store)/cart/components/CartSummary/Mobile/MobDeliveryDestination";
import { ArrowRightIcon } from "@/app/shared/assets/animatedIcons/arrow-right";
import { Button } from "@/app/shared/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/shared/components/ui/collapsible";
import { Spinner } from "@/app/shared/components/ui/spinner";
import type { AnimatedIconHandle } from "@/app/shared/types/Icon";

type MobileCartSummaryProps = {
  summary: {
    count: number;
    total: number;
    subtotal: number;
    discount: number;
  };
  isCartLoading: boolean;
  getHandlers: (id: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  getIconRef: (id: string) => (ref: AnimatedIconHandle | null) => void;
};

export function MobileCartSummary({
  summary,
  isCartLoading,
  getHandlers,
  getIconRef,
}: MobileCartSummaryProps) {
  const [open, setOpen] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="fixed right-0 bottom-0 left-0 z-10 flex flex-col items-center gap-2 bg-white p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden"
    >
      <CollapsibleTrigger className="flex w-50 justify-center">
        {open ? (
          <ChevronDown className="size-7 stroke-gray-600" />
        ) : (
          <ChevronUp className="size-7 stroke-gray-600" />
        )}
      </CollapsibleTrigger>
      <div className="flex w-full flex-col pt-0 text-gray-700">
        <CollapsibleContent className="space-y-2 border-b border-gray-200 py-3 pt-1 text-base md:text-lg">
          <MobDeliveryDestination />
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">R${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Frete:</span>
            <span className="font-semibold">R${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">R${summary.subtotal.toFixed(2)}</span>
          </div>
          <MobCouponApplier />
          {isCouponApplied && <AppliedCouponItem setIsCouponApplied={setIsCouponApplied} />}
        </CollapsibleContent>
      </div>
      <div className={`flex w-full ${open ? "flex-col" : "flex-row items-center gap-4"}`}>
        <div
          className={`flex ${open ? "w-full justify-between py-3 text-lg md:text-xl" : "flex-col rounded-xl bg-black/5 px-2 py-1"}`}
        >
          <strong
            className={`${open ? "font-bold text-black" : "text-left text-sm font-semibold tracking-wide text-black/80 uppercase"}`}
          >
            Total:
            {isCouponApplied && (
              <p className="text-xs tracking-wide text-green-600 uppercase">Cupom aplicado</p>
            )}
          </strong>
          <span className={`font-bold text-black ${open ? "" : "text-2xl"}`}>
            R${summary.total.toFixed(2)}
          </span>
        </div>
        <Button
          {...getHandlers("arrow-mobile")}
          type="button"
          disabled={isCartLoading}
          className={`w-full flex-1 rounded-xl bg-black py-4 font-bold text-white`}
        >
          {isCartLoading ? (
            <Spinner className="mx-auto size-6" />
          ) : (
            <>
              Finalizar Compra ({summary.count})
              <ArrowRightIcon ref={getIconRef("arrow-mobile")} size={25} />
            </>
          )}
        </Button>
      </div>
    </Collapsible>
  );
}
