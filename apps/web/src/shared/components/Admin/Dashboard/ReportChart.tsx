import type { AdminDashboardTimelineEntry } from "@repo/types/contracts";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/shadcn-ui/chart";

export type Period = "1D" | "1W" | "1M" | "3M" | "6M";
const PERIODS: Period[] = ["1D", "1W", "1M", "3M", "6M"];

type ReportChartProps = {
  data: AdminDashboardTimelineEntry[];
  activePeriod: Period;
  onPeriodChange: (period: Period) => void;
};

const chartConfig = {
  value: {
    label: "Receita",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

function formatChartDate(dateString: string, period: Period) {
  if (period === "6M" && dateString.length === 7) {
    const [year, month] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, 1);
    const formatted = new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(date);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1).replace(".", "");
  }

  const isoString = dateString.includes("T")
    ? dateString
    : dateString.includes(" ")
      ? dateString.replace(" ", "T")
      : `${dateString}T12:00:00Z`;

  const date = new Date(isoString);

  switch (period) {
    case "1D":
      return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(date);
    case "1W":
      const weekDay = new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date);
      return weekDay.charAt(0).toUpperCase() + weekDay.slice(1).replace(".", "");
    case "1M":
    case "3M":
      return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(date);
    default:
      return dateString;
  }
}

export function ReportChart({ data, activePeriod, onPeriodChange }: ReportChartProps) {
  let tickInterval: number;

  switch (activePeriod) {
    case "1D":
      tickInterval = 2;
      break;
    case "1M":
      tickInterval = 2;
      break;
    default:
      tickInterval = 0;
  }

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Receita</h3>
        <div className="flex items-center gap-1">
          {PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => onPeriodChange(period)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activePeriod === period
                  ? "bg-orange-500 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className="h-75 w-full px-5 [&_.recharts-surface]:overflow-visible"
      >
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{ fontSize: 12 }}
            interval={tickInterval}
            tickFormatter={(value) => formatChartDate(value, activePeriod)}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
                // MÁGICA 2: Formata o título que aparece dentro do balão do Tooltip
                labelFormatter={(label) => formatChartDate(label, activePeriod)}
                formatter={(value, _name, _item) => {
                  const numValue = typeof value === "number" ? value : Number(value ?? 0);
                  const payload = (_item as { payload: AdminDashboardTimelineEntry }).payload;
                  const isPositive = payload.percentage >= 0;
                  return (
                    <div className="flex items-center gap-2">
                      <span className="font-medium tabular-nums">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(numValue)}
                      </span>
                      <span
                        className={`text-xs ${isPositive ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {isPositive ? "+" : ""}
                        {payload.percentage}%
                      </span>
                    </div>
                  );
                }}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            fill="url(#fillValue)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
