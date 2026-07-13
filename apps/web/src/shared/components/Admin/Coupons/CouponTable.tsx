"use client";

import type { AdminCouponDto, AdminSearchCouponsResponse } from "@repo/types/contracts";
import {
  CalendarCheck,
  CalendarX,
  CheckCircle2,
  EyeOff,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { deleteCoupon } from "@/shared/actions/coupons/deleteCoupon";
import { Pagination } from "@/shared/components/Pagination";
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
  const date = d.toLocaleDateString("pt-BR");
  const time = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return { date, time };
}

const STATUS: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
  expired: {
    label: "Expirado",
    icon: <CalendarX className="size-3.5" />,
    className: "border-red-200 bg-red-50 text-red-700",
  },
  scheduled: {
    label: "Agendado",
    icon: <CalendarCheck className="size-3.5" />,
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  active: {
    label: "Ativo",
    icon: <CheckCircle2 className="size-3.5" />,
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  inactive: {
    label: "Inativo",
    icon: <EyeOff className="size-3.5" />,
    className: "border-muted bg-muted text-muted-foreground",
  },
};

function DiscountCell({ coupon: c }: { coupon: AdminCouponDto }) {
  if (c.type === "FREE_SHIPPING") {
    return (
      <div>
        <p className="text-sm">Frete Grátis</p>
      </div>
    );
  }

  const value = c.type === "PERCENTAGE" ? `${c.value}%` : c.value ? formatPrice(c.value) : "—";

  return (
    <div>
      <p className="text-sm">{value}</p>
      {c.type === "PERCENTAGE" && c.maxDiscount && (
        <p className="text-muted-foreground mt-0.5 text-xs">Máx: {formatPrice(c.maxDiscount)}</p>
      )}
    </div>
  );
}

function UsageCell({ coupon: c }: { coupon: AdminCouponDto }) {
  if (!c.usageLimit) return <p className="text-muted-foreground text-sm">—</p>;

  const pct = Math.round((c.usageCount / c.usageLimit) * 100);

  return (
    <div className="min-w-[120px]">
      <p className="text-sm font-medium">
        {c.usageCount}/{c.usageLimit}
      </p>
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <div
          className={`h-full rounded-full transition-all ${
            pct >= 100 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-neutral-900"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StatusCell({ coupon: c }: { coupon: AdminCouponDto }) {
  const now = new Date();
  const startsAtDate = new Date(c.startsAt);
  const endsAtDate = new Date(c.endsAt);

  type StatusKey = keyof typeof STATUS;
  let key: StatusKey;
  let subtitle: string;

  if (endsAtDate < now) {
    key = "expired";
    const d = formatDateTime(c.endsAt);
    subtitle = `Expirou em ${d.date} ${d.time}`;
  } else if (startsAtDate > now) {
    key = "scheduled";
    const d = formatDateTime(c.startsAt);
    subtitle = `Inicia em ${d.date} ${d.time}`;
  } else if (c.isActive) {
    key = "active";
    const d = formatDateTime(c.endsAt);
    subtitle = `Expira em ${d.date} ${d.time}`;
  } else {
    key = "inactive";
    const d = formatDateTime(c.endsAt);
    subtitle = `Expira em ${d.date} ${d.time}`;
  }

  const config = STATUS[key]!;

  return (
    <div>
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
      >
        {config.icon}
        {config.label}
      </span>
      <p className="text-muted-foreground mt-1 text-xs">{subtitle}</p>
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
        <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => onEdit(coupon)}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
        {coupon.usageCount === 0 && (
          <DropdownMenuItem
            className="cursor-pointer gap-2 text-red-500 focus:text-red-600"
            onClick={() => onDelete(coupon)}
          >
            <Trash2 className="size-4" />
            Excluir
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type CouponTableProps = {
  data: AdminSearchCouponsResponse;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (coupon: AdminCouponDto) => void;
};

export function CouponTable({ data, page, onPageChange, onEdit }: CouponTableProps) {
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Usos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Valor Mín.</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <span className="font-mono text-sm font-medium uppercase">{coupon.code}</span>
                  {coupon.description && (
                    <p className="text-muted-foreground mt-0.5 max-w-[200px] truncate text-xs">
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
                  <p className="text-sm">
                    {coupon.minOrderValue && coupon.minOrderValue > 1
                      ? formatPrice(coupon.minOrderValue)
                      : "—"}
                  </p>
                </TableCell>
                <TableCell>
                  <ActionsCell
                    coupon={coupon}
                    onEdit={onEdit}
                    onDelete={() => setDeletingCoupon(coupon)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />

      <Dialog open={!!deletingCoupon} onOpenChange={(open) => !open && setDeletingCoupon(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir cupom</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o cupom{" "}
              <span className="font-mono font-medium uppercase">{deletingCoupon?.code}</span>? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingCoupon(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
              className="gap-2"
            >
              {isDeleting && <Loader2 className="size-4 animate-spin" />}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
