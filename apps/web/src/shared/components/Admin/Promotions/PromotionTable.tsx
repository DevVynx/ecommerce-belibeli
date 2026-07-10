"use client";

import type { AdminPromotionDto, AdminSearchPromotionsResponse } from "@repo/types/contracts";
import { MoreHorizontal, Tag } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/shared/components/shadcn-ui/badge";
import { Button } from "@/shared/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn-ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcn-ui/table";
import { formatPrice } from "@/shared/utils/store/price";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function DiscountCell({ promotion: p }: { promotion: AdminPromotionDto }) {
  const label =
    p.type === "PERCENTAGE" ? `${p.discountValue}% OFF` : `${formatPrice(p.discountValue)} OFF`;

  return (
    <Badge
      variant="outline"
      className={
        p.type === "PERCENTAGE"
          ? "bg-blue-50 text-blue-700"
          : "bg-purple-50 text-purple-700"
      }
    >
      {label}
    </Badge>
  );
}

function TargetCell({ promotion: p }: { promotion: AdminPromotionDto }) {
  const targetLabels: Record<string, { label: string; color: string }> = {
    category: { label: "Categoria", color: "bg-green-50 text-green-700" },
    product: { label: "Produto", color: "bg-amber-50 text-amber-700" },
    variant: { label: "Variante", color: "bg-sky-50 text-sky-700" },
  };

  const t = targetLabels[p.targetType] as { label: string; color: string };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={`shrink-0 ${t.color}`}>
        {t.label}
      </Badge>
      <span className="text-sm truncate max-w-40">{p.targetName}</span>
    </div>
  );
}

function StatusCell({ promotion: p }: { promotion: AdminPromotionDto }) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span
          className={`inline-block size-2 rounded-full ${p.isActive ? "bg-green-500" : "bg-muted-foreground"}`}
        />
        <span className="text-sm">{p.isActive ? "Ativo" : "Inativo"}</span>
      </div>
      <p className="text-muted-foreground mt-0.5 text-xs tabular-nums">
        {formatDate(p.startsAt)} — {formatDate(p.endsAt)}
      </p>
    </div>
  );
}

function ActionsCell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>Editar</DropdownMenuItem>
        <DropdownMenuItem disabled className="text-red-500">Excluir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PromotionTable({
  data,
  page,
  onPageChange,
}: {
  data: AdminSearchPromotionsResponse;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const [editingEllipsis, setEditingEllipsis] = useState<string | null>(null);
  const totalPages = data.pagination.totalPages;

  if (data.promotions.length === 0) {
    return (
      <div className="text-muted-foreground py-16 text-center">
        <Tag className="mx-auto mb-3 size-12" />
        <p className="text-lg">Nenhuma promoção encontrada</p>
        <p className="mt-1 text-sm">Tente ajustar os filtros ou a busca.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-muted-foreground mb-3 text-sm">
        Mostrando {data.promotions.length} itens de {data.pagination.total}
      </p>

      <div className="border-border overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Alvo</TableHead>
              <TableHead>Vigência</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>
                  <p className="text-sm font-medium">{promotion.name}</p>
                </TableCell>
                <TableCell>
                  <DiscountCell promotion={promotion} />
                </TableCell>
                <TableCell>
                  <TargetCell promotion={promotion} />
                </TableCell>
                <TableCell>
                  <StatusCell promotion={promotion} />
                </TableCell>
                <TableCell>
                  <ActionsCell />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .map((p, idx, arr) => {
              const items: React.ReactNode[] = [];
              if (idx > 0 && p - arr[idx - 1]! > 1) {
                const ellipsisKey = `ellipsis-${p}`;
                const isEditing = editingEllipsis === ellipsisKey;
                items.push(
                  isEditing ? (
                    <input
                      key={ellipsisKey}
                      type="number"
                      placeholder="..."
                      min={1}
                      max={totalPages}
                      autoFocus
                      className="border-input bg-background inline-flex h-9 w-12 [appearance:textfield] items-center justify-center rounded-lg border text-center text-sm [&::-webkit-inner-spin-button]:appearance-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const val = Number((e.target as HTMLInputElement).value);
                          if (val >= 1 && val <= totalPages) onPageChange(val);
                          setEditingEllipsis(null);
                        }
                        if (e.key === "Escape") {
                          setEditingEllipsis(null);
                        }
                      }}
                      onBlur={() => setEditingEllipsis(null)}
                    />
                  ) : (
                    <button
                      key={ellipsisKey}
                      onClick={() => setEditingEllipsis(ellipsisKey)}
                      className="text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors"
                    >
                      ...
                    </button>
                  )
                );
              }
              items.push(
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {p}
                </button>
              );
              return items;
            })}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
