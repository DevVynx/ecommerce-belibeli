"use client";

import type { AdminCouponDto, AdminSearchCouponsResponse } from "@repo/types/contracts";
import { Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

import { deleteCoupon } from "@/shared/actions/coupons/deleteCoupon";
import { Button } from "@/shared/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/shadcn-ui/dialog";
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
import { useInvalidate } from "@/shared/hooks/lib/useInvalidate";
import { formatPrice } from "@/shared/utils/store/price";

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  const date = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  return { date, time };
}

function DiscountCell({ coupon: c }: { coupon: AdminCouponDto }) {
  if (c.type === "FREE_SHIPPING") {
    return (
      <div>
        <span className="font-medium">Frete Grátis</span>
      </div>
    );
  }

  const discountLabel = c.type === "PERCENTAGE" ? `${c.value}%` : formatPrice(c.value);

  return (
    <div>
      <span className="font-medium">{discountLabel}</span>
      <div className="text-muted-foreground mt-0.5 space-x-2 text-xs">
        {c.minOrderValue > 0 && <span>Mín. pedido: {formatPrice(c.minOrderValue)}</span>}
        {c.maxDiscount !== null && c.maxDiscount > 0 && c.type === "PERCENTAGE" && (
          <span>Máx. desconto: {formatPrice(c.maxDiscount)}</span>
        )}
      </div>
    </div>
  );
}

function UsageCell({ coupon: c }: { coupon: AdminCouponDto }) {
  const pct = c.usageLimit > 0 ? Math.min(100, (c.usageCount / c.usageLimit) * 100) : 0;

  return (
    <div className="min-w-35">
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <div
          className={`h-full rounded-full transition-all ${
            pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-neutral-900"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-muted-foreground mt-1 text-xs tabular-nums">
        {c.usageCount}/{c.usageLimit}
      </p>
    </div>
  );
}

function StatusCell({ coupon: c }: { coupon: AdminCouponDto }) {
  const now = new Date();
  const endsAtDate = new Date(c.endsAt);
  const isExpired = endsAtDate < now;
  const { date, time } = formatDateTime(c.endsAt);

  if (isExpired) {
    return (
      <div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block size-2 rounded-full bg-red-500" />
          <span className="text-sm text-red-500">Expirado</span>
        </div>
        <p className="mt-0.5 text-xs text-red-500/70">
          Expirou em {date} {time}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1.5">
        <span
          className={`inline-block size-2 rounded-full ${c.isActive ? "bg-green-500" : "bg-muted-foreground"}`}
        />
        <span className="text-sm">{c.isActive ? "Ativo" : "Inativo"}</span>
      </div>
      <p className="text-muted-foreground mt-0.5 text-xs">
        Expira em {date} {time}
      </p>
    </div>
  );
}

function ActionsCell({
  coupon,
  onEdit,
  onDelete,
}: {
  coupon: AdminCouponDto;
  onEdit: (coupon: AdminCouponDto) => void;
  onDelete: (coupon: AdminCouponDto) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(coupon)}>
          Editar
        </DropdownMenuItem>
        {coupon.usageCount === 0 && (
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:text-red-600"
            onClick={() => onDelete(coupon)}
          >
            Excluir
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function CouponTable({
  data,
  page,
  onPageChange,
  onEdit,
}: {
  data: AdminSearchCouponsResponse;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (coupon: AdminCouponDto) => void;
}) {
  const [editingEllipsis, setEditingEllipsis] = useState<string | null>(null);
  const [deletingCoupon, setDeletingCoupon] = useState<AdminCouponDto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const invalidate = useInvalidate();
  const totalPages = data.pagination.totalPages;

  const handleDelete = async () => {
    if (!deletingCoupon) return;
    setIsDeleting(true);
    const { error } = await deleteCoupon(deletingCoupon.id);
    setIsDeleting(false);
    if (error) return;
    setDeletingCoupon(null);
    invalidate(["admin", "coupons", "search"]);
  };

  if (data.coupons.length === 0) {
    return (
      <div className="text-muted-foreground py-16 text-center">
        <p className="text-lg">Nenhum cupom encontrado</p>
        <p className="mt-1 text-sm">Tente ajustar os filtros ou a busca.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-muted-foreground mb-3 text-sm">
        Mostrando {data.coupons.length} itens de {data.pagination.total}
      </p>

      <div className="border-border overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Uso</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <p className="font-mono text-sm font-medium">{coupon.code}</p>
                  {coupon.description && (
                    <p className="text-muted-foreground max-w-48 truncate text-xs">
                      {coupon.description}
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <DiscountCell coupon={coupon} />
                </TableCell>
                <TableCell>
                  <UsageCell coupon={coupon} />
                </TableCell>
                <TableCell>
                  <StatusCell coupon={coupon} />
                </TableCell>
                <TableCell>
                  <ActionsCell coupon={coupon} onEdit={onEdit} onDelete={setDeletingCoupon} />
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

      <Dialog open={!!deletingCoupon} onOpenChange={(open) => !open && setDeletingCoupon(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir cupom</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o cupom{" "}
              <span className="font-medium">{deletingCoupon?.code}</span>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingCoupon(null)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-1 inline size-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>
                  <Trash2 className="mr-1 inline size-4" />
                  Excluir
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
