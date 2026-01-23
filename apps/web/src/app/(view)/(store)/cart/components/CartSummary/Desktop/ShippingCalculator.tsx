import { Button } from "@/app/shared/components/ui/button";
import { Field } from "@/app/shared/components/ui/field";
import { Input } from "@/app/shared/components/ui/input";

export const ShippingCalculator = () => {
  return (
    <div className="rounded-sm bg-neutral-100 p-3">
      <Field orientation={"horizontal"}>
        <Input placeholder="Insira seu CEP (00000-000)" />
        <Button className="">Calcular frete</Button>
      </Field>
    </div>
  );
};
