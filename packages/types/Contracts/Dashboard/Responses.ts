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
