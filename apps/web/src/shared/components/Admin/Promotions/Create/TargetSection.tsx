import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { AdminProductListItem, AdminProductVariantDto } from "@repo/types/contracts";
import { ChevronDown, Loader2, Search, XIcon } from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

import { getCategories } from "@/shared/actions/products/getCategories";
import { Badge } from "@/shared/components/shadcn-ui/badge";
import { Button } from "@/shared/components/shadcn-ui/button";
import { Field, FieldContent, FieldLabel } from "@/shared/components/shadcn-ui/field";
import { Popover, PopoverTrigger } from "@/shared/components/shadcn-ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";
import { useAdminSearchProducts } from "@/shared/hooks/data/adminQueries/useProduct";
import type { CreatePromotionFormData } from "@/shared/schemas/createPromotion";
import { cn } from "@/shared/utils/lib/utils";

const PopoverContentNoPortal = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-[--radix-popover-content-transform-origin] rounded-md border p-4 shadow-md outline-none",
      className
    )}
    {...props}
  />
));
PopoverContentNoPortal.displayName = PopoverPrimitive.Content.displayName;

type SelectedTarget = {
  id: string;
  name: string;
};

export function TargetSection({ defaultTarget }: { defaultTarget?: SelectedTarget | null }) {
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreatePromotionFormData>();

  const targetType = watch("targetType");

  const [selectedTarget, setSelectedTarget] = useState<SelectedTarget | null>(
    () => defaultTarget ?? null
  );
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (defaultTarget) {
      setValue("targetId", defaultTarget.id);
      setValue("targetName", defaultTarget.name);
      clearErrors("targetId");
    }
  }, []);

  useEffect(() => {
    getCategories().then(({ data }) => {
      if (data) setCategories(data.categories);
    });
  }, []);

  const handleClear = () => {
    setSelectedTarget(null);
    setValue("targetId", "");
    setValue("targetName", "");
    clearErrors("targetId");
  };

  const handleTargetTypeChange = (v: string) => {
    setValue("targetType", v as CreatePromotionFormData["targetType"]);
    handleClear();
  };

  const handleCategorySelect = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return;
    setSelectedTarget({ id: cat.id, name: cat.name });
    setValue("targetId", cat.id);
    setValue("targetName", cat.name);
    clearErrors("targetId");
  };

  const handleProductSelect = (product: AdminProductListItem) => {
    setSelectedTarget({ id: product.id, name: product.title });
    setValue("targetId", product.id);
    setValue("targetName", product.title);
    clearErrors("targetId");
  };

  const handleVariantSelect = (variant: AdminProductVariantDto, productTitle: string) => {
    const optionsLabel = variant.options.map((o) => o.value).join(", ");
    const displayName = optionsLabel
      ? `${productTitle} · ${optionsLabel}`
      : `${productTitle} · ${variant.sku}`;
    setSelectedTarget({ id: variant.id, name: displayName });
    setValue("targetId", variant.id);
    setValue("targetName", displayName);
    clearErrors("targetId");
  };

  return (
    <Field>
      <FieldLabel>Alvo da promoção</FieldLabel>
      <FieldContent>
        <Select value={targetType} onValueChange={handleTargetTypeChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category">Categoria</SelectItem>
            <SelectItem value="product">Produto</SelectItem>
            <SelectItem value="variant">Variante</SelectItem>
          </SelectContent>
        </Select>

        <div className="mt-2">
          {targetType === "category" && (
            <CategorySelect
              categories={categories}
              selectedId={selectedTarget?.id}
              onSelect={handleCategorySelect}
            />
          )}
          {targetType === "product" && (
            <ProductSearch selectedId={selectedTarget?.id} onSelect={handleProductSelect} />
          )}
          {targetType === "variant" && (
            <VariantSearch selectedId={selectedTarget?.id} onSelect={handleVariantSelect} />
          )}
        </div>

        {selectedTarget && (
          <div className="mt-2">
            <Badge variant="secondary" className="gap-1 px-3 py-1">
              {selectedTarget.name}
              <button
                type="button"
                onClick={handleClear}
                className="ml-1 cursor-pointer"
                aria-label="Remover alvo"
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          </div>
        )}

        {errors.targetId && (
          <p className="text-destructive mt-1 text-xs">{errors.targetId.message}</p>
        )}
      </FieldContent>
    </Field>
  );
}

function CategorySelect({
  categories,
  selectedId,
  onSelect,
}: {
  categories: { id: string; name: string }[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Select value={selectedId ?? ""} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={cat.id}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ProductSearch({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect: (product: AdminProductListItem) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setDebouncedQuery("");
      return;
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (query.length < 2) {
      setDebouncedQuery("");
      return;
    }
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const shouldSearch = debouncedQuery.length >= 2;
  const { data, isLoading } = useAdminSearchProducts(
    shouldSearch ? { q: debouncedQuery, limit: 10 } : {}
  );
  const results = shouldSearch ? (data?.products ?? []) : [];
  const isSearching = shouldSearch && isLoading;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-muted-foreground w-full justify-start font-normal"
        >
          <Search className="mr-2 h-4 w-4 shrink-0" />
          {selectedId ? "Alterar produto..." : "Buscar produto..."}
        </Button>
      </PopoverTrigger>
      <PopoverContentNoPortal className="w-80 p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome do produto..."
            className="placeholder:text-muted-foreground flex h-10 w-full bg-transparent py-3 text-sm outline-none"
          />
          {isSearching && <Loader2 className="h-4 w-4 animate-spin opacity-50" />}
        </div>

        <div className="max-h-60 overflow-y-auto">
          {results.length === 0 && query.length >= 2 && !isSearching && (
            <p className="text-muted-foreground p-4 text-center text-sm">
              Nenhum produto encontrado.
            </p>
          )}

          {results.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => {
                onSelect(product);
                setOpen(false);
              }}
              className={cn(
                "hover:bg-accent flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
                product.id === selectedId && "bg-accent font-medium"
              )}
            >
              <div className="flex flex-col">
                <span>{product.title}</span>
                <span className="text-muted-foreground text-xs">
                  {product.category.name} · {product.variants.length}{" "}
                  {product.variants.length === 1 ? "variação" : "variações"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </PopoverContentNoPortal>
    </Popover>
  );
}

function VariantSearch({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect: (variant: AdminProductVariantDto, productTitle: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setDebouncedQuery("");
      return;
    }
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (query.length < 2) {
      setDebouncedQuery("");
      return;
    }
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const shouldSearch = debouncedQuery.length >= 2;
  const { data, isLoading } = useAdminSearchProducts(
    shouldSearch ? { q: debouncedQuery, limit: 10 } : {}
  );
  const results = shouldSearch ? (data?.products ?? []) : [];
  const isSearching = shouldSearch && isLoading;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="text-muted-foreground w-full justify-start font-normal"
        >
          <Search className="mr-2 h-4 w-4 shrink-0" />
          {selectedId ? "Alterar variante..." : "Buscar produto ou SKU..."}
        </Button>
      </PopoverTrigger>
      <PopoverContentNoPortal className="w-96 p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome do produto ou SKU..."
            className="placeholder:text-muted-foreground flex h-10 w-full bg-transparent py-3 text-sm outline-none"
          />
          {isSearching && <Loader2 className="h-4 w-4 animate-spin opacity-50" />}
        </div>

        <div className="max-h-72 overflow-y-auto">
          {results.length === 0 && query.length >= 2 && !isSearching && (
            <p className="text-muted-foreground p-4 text-center text-sm">
              Nenhum resultado encontrado.
            </p>
          )}

          {results.map((product) => (
            <div key={product.id}>
              <div className="bg-muted/50 flex gap-1 px-3 py-1.5 text-sm font-semibold">
                {product.title}
                <ChevronDown size={20} />
              </div>
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => {
                    onSelect(variant, product.title);
                    setOpen(false);
                  }}
                  className={cn(
                    "hover:bg-accent flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm transition-colors",
                    variant.id === selectedId && "bg-accent font-medium"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-xs">{variant.sku}</span>
                    {variant.options.length > 0 && (
                      <span className="text-muted-foreground text-xs">
                        {variant.options.map((o) => o.value).join(", ")}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </PopoverContentNoPortal>
    </Popover>
  );
}
