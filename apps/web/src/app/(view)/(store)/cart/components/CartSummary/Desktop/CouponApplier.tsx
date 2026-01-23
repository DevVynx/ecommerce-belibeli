import { Button } from "@/app/shared/components/ui/button";
import { Field } from "@/app/shared/components/ui/field";
import { Input } from "@/app/shared/components/ui/input";

export const CouponApplier = () => {
  return (
    <div className="rounded-sm bg-neutral-100 p-3">
      <Field orientation={"horizontal"}>
        <Input placeholder="Insira o cupom de desconto" />
        <Button className="font-semibold">Aplicar</Button>
      </Field>
    </div>
  );
};
