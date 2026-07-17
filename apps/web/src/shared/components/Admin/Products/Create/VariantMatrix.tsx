"use client";

import { Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/shared/components/shadcn-ui/button";
import { Input } from "@/shared/components/shadcn-ui/input";
import { Switch } from "@/shared/components/shadcn-ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcn-ui/table";
import type { CreateProductFormData } from "@/shared/schemas/createProduct";
import { generateSku } from "@/shared/utils/store/skuGenerator";

export function VariantMatrix() {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<CreateProductFormData>();
  const { fields, remove, replace } = useFieldArray({ control, name: "variants" });
  const options = watch("options");

  // Regenerate variants when options change (preserving existing edits)
  useEffect(() => {
    if (options.length === 0 || options.some((o) => !o.name || o.values.length === 0)) {
      replace([]);
      return;
    }

    const combinations = options.reduce<Record<string, string>[]>(
      (acc, opt) => acc.flatMap((combo) => opt.values.map((v) => ({ ...combo, [opt.name]: v }))),
      [{}]
    );

    const existing = new Map(getValues("variants").map((v) => [JSON.stringify(v.attributes), v]));

    const next = combinations.map((attrs) => {
      const key = JSON.stringify(attrs);
      const prev = existing.get(key);
      return (
        prev ?? {
          sku: generateSku(getValues("name") || "PROD", attrs),
          price: 0 as unknown as number,
          stock: 0 as unknown as number,
          weight: 0.1 as unknown as number,
          isActive: true,
          attributes: attrs,
        }
      );
    });

    replace(next);
  }, [options, replace, getValues]);

  if (fields.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Variantes</h2>
        <p className="text-muted-foreground text-sm">
          Adicione opções acima para gerar as combinações de variantes.
        </p>
      </div>
    );
  }

  const optionNames = (watch("options") ?? []).map((o) => o.name).filter(Boolean);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">
        Variantes ({fields.length} combinação{fields.length !== 1 ? "ões" : ""})
      </h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {optionNames.map((name) => (
                <TableHead key={name}>{name}</TableHead>
              ))}
              <TableHead className="min-w-[130px]">SKU</TableHead>
              <TableHead className="min-w-[100px]">Preço</TableHead>
              <TableHead className="min-w-[80px]">Estoque</TableHead>
              <TableHead className="w-16">Ativo</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              const attrs = watch(`variants.${index}.attributes`) ?? {};
              return (
                <TableRow key={field.id}>
                  {optionNames.map((name) => (
                    <TableCell key={name} className="text-sm">
                      {attrs[name] ?? "—"}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Input className="h-8 text-xs" {...register(`variants.${index}.sku`)} />
                    {errors.variants?.[index]?.sku && (
                      <p className="text-destructive mt-0.5 text-[10px]">
                        {errors.variants[index]!.sku!.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8 text-xs"
                      inputMode="decimal"
                      placeholder="0,00"
                      {...register(`variants.${index}.price`, { valueAsNumber: true })}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      className="h-8 text-xs"
                      inputMode="numeric"
                      placeholder="0"
                      {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex h-8 items-center">
                      <Switch
                        checked={watch(`variants.${index}.isActive`)}
                        onCheckedChange={(v) => setValue(`variants.${index}.isActive`, v)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground size-8"
                      onClick={() => remove(index)}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {fields.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Todas as variantes foram removidas. Adicione ao menos uma para criar o produto.
        </p>
      )}
    </div>
  );
}
