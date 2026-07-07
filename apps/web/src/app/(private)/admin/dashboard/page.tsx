"use client";
import type { AdminActiveOrdersRequest, AdminDashboardStatsRequest } from "@repo/types/contracts";
import { useState } from "react";

import { BadgeAlertIcon } from "@/shared/assets/animatedIcons/badge-alert";
import { BoxesIcon } from "@/shared/assets/animatedIcons/boxes";
import { DollarSignIcon } from "@/shared/assets/animatedIcons/dollar-sign";
import { DeltaLabel } from "@/shared/components/Admin/Dashboard/DeltaLabel";
import { RecentOrders } from "@/shared/components/Admin/Dashboard/RecentOrders";
import { ReportChart } from "@/shared/components/Admin/Dashboard/ReportChart";
import { StatsCard } from "@/shared/components/Admin/Dashboard/StatsCard";
import { useAdminDashboardStats } from "@/shared/hooks/data/adminQueries/useDashboardStats";
import { useAdminDashboardTimeline } from "@/shared/hooks/data/adminQueries/useDashboardTimeline";
import { useAdminCountActiveOrders } from "@/shared/hooks/data/adminQueries/useOrder";
import { useAdminLowStockProducts } from "@/shared/hooks/data/adminQueries/useProduct";
import { formatPrice } from "@/shared/utils/store/price";

type Period = "1D" | "1W" | "1M" | "3M" | "6M";

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<Period>("1W");

  const { data, isLoading } = useAdminDashboardTimeline({ range: period });

  const statsRange: AdminDashboardStatsRequest["range"] = period === "1D" ? "1W" : period;
  const { data: statsData } = useAdminDashboardStats({ range: statsRange });
  const { data: activeOrdersData } = useAdminCountActiveOrders({
    range: statsRange as AdminActiveOrdersRequest["range"],
  });
  const { data: lowStockData } = useAdminLowStockProducts();

  if (isLoading) {
    return <p>Carregando</p>;
  }

  if (!data) {
    return <p>Nenhum dado encontrado.</p>;
  }

  const lowStockCount = lowStockData?.lowStockCount ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel Administrativo</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <StatsCard
          title="Vendas Totais"
          value={formatPrice(statsData?.currentSales ?? 0)}
          description={
            statsData?.percentageDelta !== undefined && (
              <DeltaLabel value={statsData.percentageDelta} />
            )
          }
          icon={DollarSignIcon}
          iconId="total-sales"
        />
        <StatsCard
          title="Pedidos Ativos"
          value={activeOrdersData?.activeOrders ?? 0}
          description={
            activeOrdersData?.percentageDelta !== undefined && (
              <DeltaLabel value={activeOrdersData.percentageDelta} />
            )
          }
          icon={BoxesIcon}
          iconId="active-orders"
        />
        <StatsCard
          title="Alerta de Estoque"
          value={lowStockCount}
          description={
            lowStockCount > 0
              ? `${lowStockCount} produto${lowStockCount !== 1 ? "s" : ""} com estoque baixo`
              : "Estoque normal"
          }
          icon={BadgeAlertIcon}
          iconId="stock-alert"
          variant={lowStockCount > 0 ? "destructive" : "default"}
          href="/admin/products"
          hrefLabel="Revisar inventário"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReportChart data={data.timeline} activePeriod={period} onPeriodChange={setPeriod} />
        </div>
        <div className="bg-card rounded-xl border p-6">
          <h3 className="mb-4 text-lg font-semibold">Resumo do Dia</h3>
          <p className="text-muted-foreground text-sm">Em breve</p>
        </div>
      </div>

      <RecentOrders />
    </div>
  );
}
