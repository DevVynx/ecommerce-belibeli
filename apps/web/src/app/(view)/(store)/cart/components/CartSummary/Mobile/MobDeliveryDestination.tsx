import { Pencil } from "lucide-react";

import { Button } from "@/app/shared/components/ui/button";

export const MobDeliveryDestination = () => {
  return (
    <div className="flex justify-between border-b border-gray-200 pb-3 text-sm sm:text-base">
      <span>Enviando para:</span>
      <Button
        variant={"ghost"}
        className="flex items-center gap-2 p-0 text-xs font-semibold text-blue-500"
      >
        32, Belo Horizonte
        <Pencil className="size-4" />
      </Button>
    </div>
  );
};
