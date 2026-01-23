import Image from "next/image";

import { paymentLogos } from "@/app/shared/assets/images/payment-logos/paymentLogos";

export const PaymentsMethods = () => {
  return (
    <div className="rounded-sm bg-neutral-100 p-3">
      <h1 className="text-xl font-bold">Métodos de pagamento</h1>
      <div className="mt-3 flex flex-wrap items-center justify-start gap-3">
        {paymentLogos.map((payment) => (
          <Image
            key={payment.alt}
            src={payment.src}
            alt={payment.alt}
            width={50}
            className="h-auto"
          />
        ))}
      </div>
    </div>
  );
};
