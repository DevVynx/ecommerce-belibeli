"use client";

import type { AdminProductListItem, AdminSearchProductsResponse } from "@repo/types/contracts";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

import { Pagination } from "@/shared/components/Pagination";
import { Badge } from "@/shared/components/shadcn-ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcn-ui/table";
import { formatPrice } from "@/shared/utils/store/price";

function stockColor(totalStock: number): string {
  if (totalStock <= 0) return "text-red-500";
  if (totalStock <= 5) return "text-yellow-500";
  return "text-green-500";
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block size-2 rounded-full ${active ? "bg-green-500" : "bg-muted-foreground"}`}
    />
  );
}

function PriceCell({
  minPrice,
  maxPrice,
  salePrice,
  hasSale,
}: {
  minPrice: number;
  maxPrice: number;
  salePrice: number;
  hasSale: boolean;
}) {
  if (minPrice === maxPrice) {
    if (hasSale && salePrice < minPrice) {
      return (
        <span>
          <span className="text-muted-foreground mr-1 line-through">{formatPrice(minPrice)}</span>
          {formatPrice(salePrice)}
        </span>
      );
    }
    return <span>{formatPrice(minPrice)}</span>;
  }

  return (
    <span>
      {formatPrice(minPrice)} - {formatPrice(maxPrice)}
    </span>
  );
}

function VariantRow({ variant }: { variant: AdminProductListItem["variants"][number] }) {
  const hasSale = variant.salePrice < variant.price;

  return (
    <TableRow className="bg-muted/30">
      <TableCell />
      <TableCell className="py-2 pl-8">
        <span className="text-muted-foreground font-mono text-xs">{variant.sku}</span>
        {variant.options.length > 0 && (
          <span className="text-muted-foreground ml-2 text-xs">
            · {variant.options.map((o) => `${o.name}: ${o.value}`).join(", ")}
          </span>
        )}
      </TableCell>
      <TableCell />
      <TableCell className="py-2">
        {hasSale ? (
          <span>
            <span className="text-muted-foreground mr-1 text-xs line-through">
              {formatPrice(variant.price)}
            </span>
            <span className="text-xs font-medium">{formatPrice(variant.salePrice)}</span>
            <Badge variant="outline" className="ml-1 bg-red-50 px-1 py-0 text-[10px] text-red-600">
              -{Math.round(((variant.price - variant.salePrice) / variant.price) * 100)}%
            </Badge>
          </span>
        ) : (
          <span className="text-xs">{formatPrice(variant.price)}</span>
        )}
      </TableCell>
      <TableCell className={`py-2 text-xs ${stockColor(variant.stock)}`}>{variant.stock}</TableCell>
      <TableCell className="py-2">
        {variant.isActive ? (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            Ativo
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            Inativo
          </Badge>
        )}
      </TableCell>
    </TableRow>
  );
}

function ProductRow({
  product,
  isExpanded,
  onToggle,
}: {
  product: AdminProductListItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasSale = product.variants.some((v) => v.salePrice < v.price);

  return (
    <>
      <TableRow className="hover:bg-muted/50 cursor-pointer" onClick={onToggle}>
        <TableCell className="w-10">
          <ChevronDown
            className={`text-muted-foreground size-4 transition-transform duration-200 ${isExpanded ? "" : "-rotate-90"}`}
          />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <div className="bg-muted relative size-10 shrink-0 overflow-hidden rounded-md">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">{product.title}</p>
              {product.category && (
                <p className="text-muted-foreground text-xs">{product.category.name}</p>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <span className="text-sm tabular-nums">
            {product.activeCount + product.inactiveCount}
          </span>
        </TableCell>
        <TableCell>
          <PriceCell
            minPrice={product.minPrice}
            maxPrice={product.maxPrice}
            salePrice={Math.min(...product.variants.map((v) => v.salePrice))}
            hasSale={hasSale}
          />
        </TableCell>
        <TableCell>
          <span className={`text-sm font-medium tabular-nums ${stockColor(product.totalStock)}`}>
            {product.totalStock}
          </span>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: product.activeCount }).map((_, i) => (
              <StatusDot key={`active-${i}`} active />
            ))}
            {Array.from({ length: product.inactiveCount }).map((_, i) => (
              <StatusDot key={`inactive-${i}`} active={false} />
            ))}
          </div>
        </TableCell>
      </TableRow>
      {isExpanded &&
        product.variants.map((variant) => <VariantRow key={variant.id} variant={variant} />)}
    </>
  );
}

type ProductTableProps = {
  data: AdminSearchProductsResponse;
  page: number;
  onPageChange: (page: number) => void;
};

export function ProductTable({ data, page, onPageChange }: ProductTableProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const totalPages = data.pagination.totalPages;

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (data.products.length === 0) {
    return (
      <div className="text-muted-foreground py-16 text-center">
        <p className="text-lg">Nenhum produto encontrado</p>
        <p className="mt-1 text-sm">Tente ajustar os filtros ou a busca.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-muted-foreground mb-3 text-sm">
        Mostrando {data.products.length} itens de {data.pagination.total}
      </p>

      <div className="border-border overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>Produto</TableHead>
              <TableHead className="w-16">Vars</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="w-20">Estoque</TableHead>
              <TableHead className="w-16">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isExpanded={expandedIds.has(product.id)}
                onToggle={() => toggleExpanded(product.id)}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
