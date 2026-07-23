"use client";
import type { AdminDaySummaryResponse } from "@repo/types/contracts";

import { formatPrice } from "@/shared/utils/store/price";

function Delta({ current, previous }: { current: number; previous: number }) {
  if (previous === 0) {
    if (current === 0) return null;
    return <span className="text-emerald-500">+100% vs ontem</span>;
  }

  const pct = ((current - previous) / previous) * 100;
  const sign = pct >= 0 ? "+" : "";
  const color = pct >= 0 ? "text-emerald-500" : "text-red-500";

  return (
    <span className={color}>
      {sign}
      {pct.toFixed(1)}% vs ontem
    </span>
  );
}

type DaySummaryCardProps = {
  data: AdminDaySummaryResponse;
};

export function DaySummaryCard({ data }: DaySummaryCardProps) {
  return (
    <div className="bg-card rounded-xl border p-6">
      <h3 className="mb-5 text-lg font-semibold">Resumo do Dia</h3>

      <div className="space-y-5">
        <div>
          <p className="text-muted-foreground text-sm font-medium">Faturamento</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{formatPrice(data.todayRevenue)}</p>
          <p className="mt-0.5 text-sm">
            <Delta current={data.todayRevenue} previous={data.yesterdayRevenue} />
          </p>
        </div>

        <div className="border-border/50 border-t pt-4">
          <p className="text-muted-foreground text-sm font-medium">Pedidos</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">{data.todayOrders}</p>
          <p className="mt-0.5 text-sm">
            <Delta current={data.todayOrders} previous={data.yesterdayOrders} />
          </p>
        </div>
      </div>
    </div>
  );
}
