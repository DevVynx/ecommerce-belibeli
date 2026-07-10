import { Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";

export const sortValues = [
  "newest",
  "oldest",
  "expiring_soon",
  "discount_desc",
  "discount_asc",
] as const;

const sortLabels: Record<(typeof sortValues)[number], string> = {
  newest: "Mais recentes",
  oldest: "Mais antigos",
  expiring_soon: "Próximos do vencimento",
  discount_desc: "Maior desconto",
  discount_asc: "Menor desconto",
};

export type PromotionFiltersValue = {
  q: string | null;
  status: "active" | "inactive" | null;
  type: "PERCENTAGE" | "FIXED" | null;
  targetType: "category" | "product" | "variant" | null;
  sort: (typeof sortValues)[number];
};

export function PromotionFilters({
  values,
  onChange,
}: {
  values: PromotionFiltersValue;
  onChange: (updates: Partial<PromotionFiltersValue>) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <input
          placeholder="Buscar por nome"
          defaultValue={values.q ?? ""}
          onBlur={(e) => onChange({ q: e.target.value || null })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange({ q: (e.target as HTMLInputElement).value || null });
            }
          }}
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-lg border pr-4 pl-10 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select
          value={values.status ?? ""}
          onValueChange={(v) =>
            onChange({ status: v !== "__all__" ? (v as "active" | "inactive") : null })
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todos os status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={values.type ?? ""}
          onValueChange={(v) =>
            onChange({ type: v !== "__all__" ? (v as "PERCENTAGE" | "FIXED") : null })
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todos os tipos</SelectItem>
            <SelectItem value="PERCENTAGE">Percentual</SelectItem>
            <SelectItem value="FIXED">Fixo</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={values.targetType ?? ""}
          onValueChange={(v) =>
            onChange({
              targetType: v !== "__all__" ? (v as "category" | "product" | "variant") : null,
            })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Alvo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todos os alvos</SelectItem>
            <SelectItem value="category">Categoria</SelectItem>
            <SelectItem value="product">Produto</SelectItem>
            <SelectItem value="variant">Variante</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={values.sort}
          onValueChange={(v) => onChange({ sort: v as PromotionFiltersValue["sort"] })}
        >
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            {sortValues.map((v) => (
              <SelectItem key={v} value={v}>
                {sortLabels[v]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
