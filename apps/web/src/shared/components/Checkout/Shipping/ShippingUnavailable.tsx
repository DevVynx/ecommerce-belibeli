import { ArrowLeft } from "lucide-react";

import { Button } from "@/shared/components/shadcn-ui/button";

type ShippingUnavailableProps = {
  onPrevious: () => void;
};

export const ShippingUnavailable = ({ onPrevious }: ShippingUnavailableProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        <p className="font-semibold">Não entregamos neste endereço</p>
        <p className="mt-1">
          Infelizmente não há opções de frete disponíveis para o CEP informado. Volte e escolha um
          endereço diferente.
        </p>
      </div>

      <div className="flex flex-1 flex-col-reverse items-center justify-between gap-5 pt-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          className="border-primary/30 w-full cursor-pointer px-6 py-3 sm:w-auto"
          onClick={onPrevious}
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
      </div>
    </div>
  );
};
