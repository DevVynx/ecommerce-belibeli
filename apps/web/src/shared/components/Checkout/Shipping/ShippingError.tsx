"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/shared/components/shadcn-ui/button";

type ShippingErrorProps = {
  message: string;
  onPrevious: () => void;
};

export const ShippingError = ({ message, onPrevious }: ShippingErrorProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {message}
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
