import { Controller, useFormContext } from "react-hook-form";

import { CurrencyInput } from "@/shared/components/currency-input";
import { Field, FieldContent, FieldLabel } from "@/shared/components/shadcn-ui/field";
import { Input } from "@/shared/components/shadcn-ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";
import type { CreatePromotionFormData } from "@/shared/schemas/createPromotion";

export function PromotionDiscountFields() {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CreatePromotionFormData>();

  const type = watch("type");
  const currentValue = watch("discountValue");

  return (
    <>
      <Field>
        <FieldLabel>Tipo</FieldLabel>
        <FieldContent>
          <Select
            value={type}
            onValueChange={(v) => {
              setValue("type", v as CreatePromotionFormData["type"]);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERCENTAGE">Percentual</SelectItem>
              <SelectItem value="FIXED">Fixo</SelectItem>
            </SelectContent>
          </Select>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>{type === "PERCENTAGE" ? "Desconto (%)" : "Valor (R$)"}</FieldLabel>
        <FieldContent>
          {type === "PERCENTAGE" ? (
            <Controller
              name="discountValue"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Ex: 15"
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    field.onChange(digits ? Math.min(parseInt(digits, 10), 100) : 0);
                  }}
                />
              )}
            />
          ) : (
            <CurrencyInput
              value={currentValue}
              onChange={(v) => setValue("discountValue", v ?? 0)}
              placeholder="Ex: 50,00"
            />
          )}
          {errors.discountValue && (
            <p className="text-destructive mt-1 text-xs">{errors.discountValue.message}</p>
          )}
        </FieldContent>
      </Field>
    </>
  );
}
