"use client";
import { useState } from "react";

import { ReportChart } from "@/shared/components/Admin/Dashboard/ReportChart";
// import { useAdminOrders } from "@/shared/hooks/data/adminQueries/useOrder";
import { useAdminDashboardTimeline } from "@/shared/hooks/data/adminQueries/useTimeline";

export default function AdminPage() {
  const [period, setPeriod] = useState<Period>("1W");
  // const { data } = useAdminOrders({ limit: 10, page: 1, sort: "desc" });
  const { data, isLoading } = useAdminDashboardTimeline({ range: period });

  if (isLoading) {
    return <p>Carregando</p>;
  }

  if (!data) {
    return <p>Nenhum dado encontrado.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-0">
      <h1 className="mb-6 text-2xl font-bold">Painel Administrativo</h1>
      <div className="grid grid-cols-3 gap-6 ">
        <div className="lg:col-span-2">
          <ReportChart data={data.timeline} activePeriod={period} onPeriodChange={setPeriod} />
        </div>
        <div className="bg-card rounded-xl border p-6">
          <h3 className="mb-4 text-lg font-semibold">Resumo</h3>
          <p className="text-muted-foreground text-sm">Em breve</p>
        </div>
      </div>
    </div>
  );
}

type Period = "1D" | "1W" | "1M" | "3M" | "6M";
