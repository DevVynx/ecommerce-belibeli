"use client";
import type {
  AdminDashboardStatsRequest,
  AdminDashboardTimelineRequest,
} from "@repo/types/contracts";
import { useState } from "react";

import { BadgeAlertIcon } from "@/shared/assets/animatedIcons/badge-alert";
import { BoxesIcon } from "@/shared/assets/animatedIcons/boxes";
import { DollarSignIcon } from "@/shared/assets/animatedIcons/dollar-sign";
import { DeltaLabel } from "@/shared/components/Admin/Dashboard/DeltaLabel";
import { RecentOrders } from "@/shared/components/Admin/Dashboard/RecentOrders";
import { ReportChart } from "@/shared/components/Admin/Dashboard/ReportChart";
import { StatsCard } from "@/shared/components/Admin/Dashboard/StatsCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/shadcn-ui/select";
import { useAdminDashboardStats } from "@/shared/hooks/data/adminQueries/useDashboardStats";
import { useAdminDashboardTimeline } from "@/shared/hooks/data/adminQueries/useDashboardTimeline";
import { useAdminCountActiveOrders } from "@/shared/hooks/data/adminQueries/useOrder";
import { useAdminLowStockProducts } from "@/shared/hooks/data/adminQueries/useProduct";
import { formatPrice } from "@/shared/utils/store/price";

export default function AdminDashboardPage() {
  const [timelinePeriod, setTimelinePeriod] =
    useState<AdminDashboardTimelineRequest["range"]>("1W");
  const [statsPeriod, setStatsPeriod] = useState<AdminDashboardStatsRequest["range"]>("1M");

  const { data: timelineData, isLoading } = useAdminDashboardTimeline({ range: timelinePeriod });
  const { data: statsData } = useAdminDashboardStats({ range: statsPeriod });
  const { data: activeOrdersData } = useAdminCountActiveOrders({ range: statsPeriod });
  const { data: lowStockData } = useAdminLowStockProducts();

  if (isLoading) {
    return <p>Carregando</p>;
  }

  if (!timelineData) {
    return <p>Nenhum dado encontrado.</p>;
  }

  const lowStockCount = lowStockData?.lowStockCount ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Select
          value={statsPeriod}
          onValueChange={(v) => setStatsPeriod(v as AdminDashboardStatsRequest["range"])}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1W">Última semana</SelectItem>
            <SelectItem value="1M">Último mês</SelectItem>
            <SelectItem value="3M">Últimos 3 meses</SelectItem>
            <SelectItem value="6M">Últimos 6 meses</SelectItem>
            <SelectItem value="1Y">Último ano</SelectItem>
            <SelectItem value="ALL">Todas</SelectItem>
          </SelectContent>
        </Select>
      </div>

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReportChart
            data={timelineData.timeline}
            activePeriod={timelinePeriod}
            onPeriodChange={setTimelinePeriod}
          />
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
