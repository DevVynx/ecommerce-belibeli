import { CouponApplier } from "@/app/(view)/(store)/cart/components/CartSummary/Desktop/CouponApplier";
import { ShippingCalculator } from "@/app/(view)/(store)/cart/components/CartSummary/Desktop/ShippingCalculator";
import { ArrowRightIcon } from "@/app/shared/assets/animatedIcons/arrow-right";
import { Button } from "@/app/shared/components/ui/button";
import { Spinner } from "@/app/shared/components/ui/spinner";
import type { AnimatedIconHandle } from "@/app/shared/types/Icon";

import { PaymentsMethods } from "./PaymentsMethods";

type DesktopCartSummaryProps = {
  summary: {
    count: number;
    total: number;
    subtotal: number;
    discount: number;
  };
  isCartLoading: boolean;
  stickyTopValue: number;
  getHandlers: (id: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  getIconRef: (id: string) => (ref: AnimatedIconHandle | null) => void;
};

export function DesktopCartSummary({
  summary,
  isCartLoading,
  stickyTopValue,
  getHandlers,
  getIconRef,
}: DesktopCartSummaryProps) {
  return (
    <div
      className="sticky hidden space-y-3 self-start transition-all duration-300 ease-in-out lg:block"
      style={{ top: `${stickyTopValue}px` }}
    >
      <ShippingCalculator />
      <div className="rounded-sm bg-neutral-100 p-3">
        <h1 className="text-xl font-bold">Resumo do pedido</h1>
        <span className="text-xs text-black/50">
          Prossiga com a aplicação de descontos e confirme o preço final.
        </span>

        <div className="border-b pb-4">
          <div className="mt-3 flex justify-between text-sm">
            <strong>Subtotal:</strong>
            <span className="font-bold">R${summary.subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <p>Descontos:</p>
            <span className="font-bold text-red-500">-R${summary.discount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <strong>Preço total:</strong>
          <span className="bg-black/5 px-1 text-2xl font-bold">R${summary.total.toFixed(2)}</span>
        </div>

        <Button
          disabled={isCartLoading}
          {...getHandlers("arrow-desktop")}
          type="button"
          className="mt-3 w-full py-3 font-bold"
        >
          {isCartLoading ? (
            <Spinner className="mx-auto size-6" />
          ) : (
            <>
              Finalizar Compra ({summary.count})
              <ArrowRightIcon size={20} ref={getIconRef("arrow-desktop")} />
            </>
          )}
        </Button>
      </div>
      <CouponApplier />
      <PaymentsMethods />
    </div>
  );
}
