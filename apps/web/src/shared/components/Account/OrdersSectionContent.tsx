"use client";
import type { OrderDto } from "@repo/types/contracts";
import { Package } from "lucide-react";

import { Badge } from "@/shared/components/shadcn-ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/shadcn-ui/table";

type OrdersSectionContentProps = {
  orders: OrderDto[];
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  PROCESSING: "Processando",
  SHIPPED: "Enviado",
  DELIVERED: "Entregue",
  CANCELED: "Cancelado",
  REFUNDED: "Reembolsado",
};

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  PENDING: "secondary",
  PAID: "default",
  PROCESSING: "default",
  SHIPPED: "default",
  DELIVERED: "default",
  CANCELED: "destructive",
  REFUNDED: "outline",
};

export const OrdersSectionContent = ({ orders }: OrdersSectionContentProps) => {
  if (orders.length === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-lg font-semibold">Meus Pedidos</h2>
        <div className="flex flex-col items-center gap-3 py-12">
          <Package className="text-muted-foreground size-12" />
          <p className="text-muted-foreground text-sm">Nenhum pedido encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-lg font-semibold">Meus Pedidos</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">BEL-{String(order.orderNumber).padStart(6, "0")}</TableCell>
                <TableCell className="text-sm">
                  {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Badge variant={STATUS_VARIANTS[order.status] ?? "secondary"}>
                    {STATUS_LABELS[order.status] ?? order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(order.total)}
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground text-xs">—</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
