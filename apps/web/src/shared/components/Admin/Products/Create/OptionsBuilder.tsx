"use client";

import { XIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/shared/components/shadcn-ui/button";
import { Field, FieldContent, FieldLabel } from "@/shared/components/shadcn-ui/field";
import { Input } from "@/shared/components/shadcn-ui/input";
import type { CreateProductFormData } from "@/shared/schemas/createProduct";

export function OptionsBuilder() {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CreateProductFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "options" });

  const addValue = useCallback(
    (index: number, value: string) => {
      const current = watch(`options.${index}.values`) ?? [];
      setValue(`options.${index}.values`, [...current, value], { shouldValidate: true });
    },
    [setValue, watch]
  );

  const removeValue = useCallback(
    (index: number, valueIndex: number) => {
      const current = watch(`options.${index}.values`) ?? [];
      setValue(
        `options.${index}.values`,
        current.filter((_, i) => i !== valueIndex),
        { shouldValidate: true }
      );
    },
    [setValue, watch]
  );

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Opções do Produto</h2>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">Adicione opções como Cor, Tamanho, etc.</p>
      )}

      {fields.map((field, index) => {
        const values = watch(`options.${index}.values`) ?? [];
        return (
          <div key={field.id} className="border-border rounded-lg border p-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="flex-1">
                <Field>
                  <FieldLabel>Nome da opção</FieldLabel>
                  <FieldContent>
                    <Input placeholder="Ex: Cor" {...register(`options.${index}.name`)} />
                    {errors.options?.[index]?.name && (
                      <p className="text-destructive mt-1 text-xs">
                        {errors.options[index]!.name!.message}
                      </p>
                    )}
                  </FieldContent>
                </Field>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-muted-foreground mt-6 size-8 shrink-0"
                onClick={() => remove(index)}
              >
                <XIcon className="size-4" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {values.map((val, vi) => (
                <span
                  key={`${field.id}-${vi}`}
                  className="bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium"
                >
                  {val}
                  <button
                    type="button"
                    className="hover:text-destructive ml-0.5"
                    onClick={() => removeValue(index, vi)}
                  >
                    <XIcon className="size-3" />
                  </button>
                </span>
              ))}
              <AddValueInput onAdd={(v) => addValue(index, v)} />
            </div>
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ name: "", values: [] })}
      >
        + Adicionar Opção
      </Button>
    </div>
  );
}

function AddValueInput({ onAdd }: { onAdd: (value: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Input
      ref={ref}
      placeholder="+ Adicionar valor"
      className="h-7 w-36 text-xs"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const val = e.currentTarget.value.trim();
          if (!val) return;
          onAdd(val);
          e.currentTarget.value = "";
        }
      }}
      onBlur={(e) => {
        const val = e.currentTarget.value.trim();
        if (!val) return;
        onAdd(val);
        e.currentTarget.value = "";
      }}
    />
  );
}
