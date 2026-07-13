import type { CategoryDto } from "@repo/types/contracts";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { getCategories } from "@/shared/actions/products/getCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";
import { showNotification } from "@/shared/components/showNotification";

export const sortValues = [
  "newest",
  "oldest",
  "price_asc",
  "price_desc",
  "stock_asc",
  "stock_desc",
] as const;

const sortLabels: Record<(typeof sortValues)[number], string> = {
  newest: "Mais recentes",
  oldest: "Mais antigos",
  price_asc: "Menor preço",
  price_desc: "Maior preço",
  stock_asc: "Menor estoque",
  stock_desc: "Maior estoque",
};

export type ProductFiltersValue = {
  q: string | null;
  categoryId: string | null;
  status: "active" | "inactive" | null;
  stock: "low" | "out" | null;
  sort: (typeof sortValues)[number];
};

type ProductFiltersProps = {
  values: ProductFiltersValue;
  onChange: (updates: Partial<ProductFiltersValue>) => void;
};

export function ProductFilters({ values, onChange }: ProductFiltersProps) {
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await getCategories();
      if (!data || error) {
        showNotification({
          type: "error",
          title: "Erro ao buscar categorias",
          message: error?.message,
        });
        return;
      }
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <input
          placeholder="Buscar por nome ou SKU"
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
          value={values.categoryId ?? ""}
          onValueChange={(v) => onChange({ categoryId: v !== "__all__" ? v : null })}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todas as categorias</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
          value={values.stock ?? ""}
          onValueChange={(v) => onChange({ stock: v !== "__all__" ? (v as "low" | "out") : null })}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Estoque" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Todos</SelectItem>
            <SelectItem value="low">Estoque baixo (≤5)</SelectItem>
            <SelectItem value="out">Sem estoque</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={values.sort}
          onValueChange={(v) => onChange({ sort: v as ProductFiltersValue["sort"] })}
        >
          <SelectTrigger className="w-44">
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
