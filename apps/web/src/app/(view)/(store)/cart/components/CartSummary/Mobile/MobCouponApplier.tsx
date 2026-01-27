import { Tag } from "lucide-react";
import { useState } from "react";

import { Button } from "@/app/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/shared/components/ui/dialog";
import { Field } from "@/app/shared/components/ui/field";
import { Input } from "@/app/shared/components/ui/input";

export const MobCouponApplier = () => {
  const [inputValue, setInputValue] = useState("");

  const handleApplyCoupon = () => {
    console.log("Cupom de desconto aplicado:", inputValue);
  };
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-1 text-sm font-semibold text-blue-500">
        <Tag className="size-4" /> Aplicar Cupom
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Cupom</DialogTitle>
          <DialogDescription>Adicione o código do cupom de desconto abaixo</DialogDescription>
        </DialogHeader>
        <div className="rounded-sm px-2">
          <Field orientation={"vertical"} className="flex flex-col gap-4">
            <Input
              placeholder="Insira o cupom de desconto"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <DialogClose asChild>
              <Button className="py-3 font-semibold" onClick={handleApplyCoupon}>
                Aplicar
              </Button>
            </DialogClose>
          </Field>
        </div>
      </DialogContent>
    </Dialog>
  );
};
