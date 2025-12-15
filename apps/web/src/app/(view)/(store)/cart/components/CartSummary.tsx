import Image from "next/image";

import { paymentLogos } from "@/app/shared/assets/images/payment-logos/paymentLogos";

type CartSummaryProps = {
  summary: {
    count: number;
    total: number;
    subtotal: number;
    discount: number;
  };
};

export const CartSummary = ({ summary }: CartSummaryProps) => {
  return (
    <div className="max-w-sm xl:max-w-lg">
      <div className="fixed right-0 bottom-0 left-0 z-10 flex flex-col items-center gap-2 bg-white p-3 text-sm sm:text-base md:text-lg lg:hidden">
        <div className="w-full rounded-md bg-neutral-100 p-3">
          <div className="flex justify-between font-bold text-black/80">
            <strong>Total:</strong>
            <span>R${summary.total.toFixed(2)}</span>
          </div>
        </div>
        <button className="active:black/90 w-full rounded-lg bg-black py-3 font-bold text-white hover:bg-black/90 active:bg-black/80">
          Finalizar Compra
        </button>
      </div>

      <div className="sticky top-3 hidden space-y-3 self-start lg:block">
        <div className="rounded-sm bg-white p-3">
          <h1 className="text-2xl font-semibold">Resumo do pedido</h1>
          <span className="text-xs text-black/30">
            Prossiga com a aplicação de descontos e confirme o preço final.
          </span>

          <div className="border-b pb-4">
            <div className="mt-3 flex justify-between text-sm">
              <strong>Preço de varejo:</strong>
              <span className="font-bold">R${summary.subtotal.toFixed(2)}</span>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <p>Descontos:</p>
              <span className="font-bold text-red-500">
                -R${summary.discount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <strong>Preço total:</strong>
            <span className="text-2xl font-bold">
              R${summary.total.toFixed(2)}
            </span>
          </div>

          <button className="active:black/90 mt-3 w-full cursor-pointer rounded-sm bg-black py-3 font-bold text-white hover:bg-black/80 active:bg-black/70">
            Finalizar Compra ({summary.count})
          </button>
        </div>

        <div className="rounded-sm bg-white p-3">
          <h1 className="text-2xl font-semibold">Pagamento</h1>
          <div className="mt-3 flex flex-wrap gap-3">
            {paymentLogos.map((payment) => (
              <Image
                key={payment.alt}
                src={payment.src}
                alt={payment.alt}
                width={50}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
