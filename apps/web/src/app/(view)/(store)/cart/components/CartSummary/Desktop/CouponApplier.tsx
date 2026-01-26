import { useState } from "react";

import { Button } from "@/app/shared/components/ui/button";
import { Field } from "@/app/shared/components/ui/field";
import { Input } from "@/app/shared/components/ui/input";

export const CouponApplier = () => {
  const [inputValue, setInputValue] = useState("");

  const handleApplyCoupon = () => {
    console.log("Cupom de desconto aplicado:", inputValue);
  };

  return (
    <div className="rounded-sm bg-neutral-100 p-3">
      <Field orientation={"horizontal"}>
        <Input
          placeholder="Insira o cupom de desconto"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className="font-semibold" onClick={handleApplyCoupon}>
          Aplicar
        </Button>
      </Field>
    </div>
  );
};
