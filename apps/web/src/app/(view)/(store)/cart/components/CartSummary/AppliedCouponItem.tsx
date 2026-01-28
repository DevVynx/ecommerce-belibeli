import { Ticket, X } from "lucide-react";

import { Button } from "@/app/shared/components/ui/button";

type setIsCouponAppliedProps = {
  setIsCouponApplied: (isCouponApplied: boolean) => void;
};

export const AppliedCouponItem = ({ setIsCouponApplied }: setIsCouponAppliedProps) => {
  return (
    <div className="flex w-full items-center rounded-md border-2 border-dotted border-neutral-200 bg-neutral-100 py-2">
      <div className="flex w-full items-center justify-between px-4">
        <Ticket className="size-7 stroke-stone-500" />
        <div className="flex w-full items-center justify-between pr-5 pl-2">
          <strong className="text-lg text-black">CUPOMTESTE20</strong>
          <strong className="text-green-600">-R$20.00</strong>
        </div>
        <Button
          onClick={() => setIsCouponApplied(false)}
          variant={"ghost"}
          className="rounded-full border border-neutral-300 p-1"
        >
          <X className="size-5 stroke-stone-500" />
        </Button>
      </div>
    </div>
  );
};
