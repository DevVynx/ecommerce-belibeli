export type AdminDashboardTimelineRequest = {
  range: "1D" | "1W" | "1M" | "3M" | "6M";
};

export type AdminDashboardStatsRequest = {
  range: "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";
};
