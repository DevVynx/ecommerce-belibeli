export type AdminDashboardTimelineEntry = {
  date: string;
  value: number;
  percentage: number;
};

export type AdminDashboardTimelineResponse = {
  timeline: AdminDashboardTimelineEntry[];
};

export type AdminDashboardStatsResponse = {
  currentSales: number;
  percentageDelta: number;
};

export type AdminDaySummaryResponse = {
  todayRevenue: number;
  yesterdayRevenue: number;
  todayOrders: number;
  yesterdayOrders: number;
};
