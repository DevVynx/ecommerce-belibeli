import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/app/shared/components/ui/button";
import { Field, FieldError } from "@/app/shared/components/ui/field";
import { Input } from "@/app/shared/components/ui/input";
import { cepSchema } from "@/app/shared/schemas/cep";
import { formatCep } from "@/app/shared/utils/store/formatCep";

export const ShippingCalculator = () => {
  const form = useForm<z.infer<typeof cepSchema>>({
    resolver: zodResolver(cepSchema),
    defaultValues: {
      cep: "",
    },
  });

  const onSubmit = (data: z.infer<typeof cepSchema>) => {
    const cep = data.cep.replace("-", "");
    console.log("Calculating shipping for CEP:", cep);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-sm bg-neutral-100 p-3">
      <Controller
        name="cep"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <Field orientation={"horizontal"}>
              <Input
                {...field}
                placeholder="Insira seu CEP (00000-000)"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, "");
                  field.onChange(formatCep(onlyNumbers));
                }}
              />
              <Button type="submit" className="font-semibold">
                Calcular frete
              </Button>
            </Field>
            <div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <a
                href="https://devvynx.github.io/Buscador-de-CEP/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-black underline"
              >
                Não sei o meu CEP
              </a>
            </div>
          </>
        )}
      />
    </form>
  );
};
