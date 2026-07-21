"use client";

import type { AdminPromotionDto, AdminSearchPromotionsResponse } from "@repo/types/contracts";
import {
  CalendarCheck,
  CalendarX,
  CheckCircle2,
  EyeOff,
  Loader2,
  MoreHorizontal,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { deletePromotion } from "@/shared/actions/promotions/deletePromotion";
import { Badge } from "@/shared/components/shadcn-ui/badge";
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

const DISCOUNT_STYLES: Record<string, string> = {
  PERCENTAGE: "border-rose-200 bg-rose-50 text-rose-700",
  FIXED: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function DiscountCell({ promotion: p }: { promotion: AdminPromotionDto }) {
  const label =
    p.type === "PERCENTAGE" ? `${p.discountValue}% OFF` : `${formatPrice(p.discountValue)} OFF`;

  return (
    <Badge variant="outline" className={DISCOUNT_STYLES[p.type] ?? ""}>
      {label}
    </Badge>
  );
}

const TARGET_STYLES: Record<string, { label: string; className: string }> = {
  category: {
    label: "Categoria",
    className: "border-teal-200 bg-teal-50 text-teal-700",
  },
  product: {
    label: "Produto",
    className: "border-indigo-200 bg-indigo-50 text-indigo-700",
  },
  variant: {
    label: "Variante",
    className: "border-sky-200 bg-sky-50 text-sky-700",
  },
};

function TargetCell({ promotion: p }: { promotion: AdminPromotionDto }) {
  const t = TARGET_STYLES[p.targetType]!;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={`shrink-0 ${t.className}`}>
        {t.label}
      </Badge>
      <span className="max-w-40 truncate text-sm">{p.targetName}</span>
    </div>
  );
}

const STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; className: string }> = {
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

function StatusCell({ promotion: p }: { promotion: AdminPromotionDto }) {
  const now = new Date();
  const startsAtDate = new Date(p.startsAt);
  const endsAtDate = new Date(p.endsAt);

  type StatusKey = keyof typeof STATUS_CONFIG;
  let key: StatusKey;
  let subtitle: string;

  if (endsAtDate < now) {
    key = "expired";
    const d = formatDateTime(p.endsAt);
    subtitle = `Expirou em ${d.date} ${d.time}`;
  } else if (startsAtDate > now) {
    key = "scheduled";
    const d = formatDateTime(p.startsAt);
    subtitle = `Inicia em ${d.date} ${d.time}`;
  } else if (p.isActive) {
    key = "active";
    const d = formatDateTime(p.endsAt);
    subtitle = `Expira em ${d.date} ${d.time}`;
  } else {
    key = "inactive";
    const d = formatDateTime(p.endsAt);
    subtitle = `Expira em ${d.date} ${d.time}`;
  }

  const config = STATUS_CONFIG[key]!;

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
  promotion,
  onEdit,
  onDelete,
}: {
  promotion: AdminPromotionDto;
  onEdit: (promotion: AdminPromotionDto) => void;
  onDelete: (promotion: AdminPromotionDto) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => onEdit(promotion)}>
          <Pencil className="size-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer gap-2 text-red-500 focus:text-red-600"
          onClick={() => onDelete(promotion)}
        >
          <Trash2 className="size-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PromotionTable({
  data,
  page,
  onPageChange,
  onEdit,
}: {
  data: AdminSearchPromotionsResponse;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (promotion: AdminPromotionDto) => void;
}) {
  const [deletingPromotion, setDeletingPromotion] = useState<AdminPromotionDto | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingEllipsis, setEditingEllipsis] = useState<string | null>(null);
  const invalidate = useInvalidate();
  const totalPages = data.pagination.totalPages;

  const handleDelete = async () => {
    if (!deletingPromotion) return;
    setIsDeleting(true);
    const { error } = await deletePromotion(deletingPromotion.id);
    setIsDeleting(false);
    if (error) return;
    setDeletingPromotion(null);
    invalidate(["admin", "promotions", "search"]);
  };

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
              <TableHead>Status</TableHead>
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
                  <ActionsCell
                    promotion={promotion}
                    onEdit={onEdit}
                    onDelete={() => setDeletingPromotion(promotion)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!deletingPromotion}
        onOpenChange={(open) => !open && setDeletingPromotion(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir promoção</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a promoção{" "}
              <span className="font-medium">{deletingPromotion?.name}</span>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingPromotion(null)}>
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
