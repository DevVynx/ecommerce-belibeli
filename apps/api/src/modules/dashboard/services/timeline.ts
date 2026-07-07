import { dashboardRepositories } from "@/modules/dashboard/repositories";

export const getTimeline = async (range: string) => {
  const rows = await dashboardRepositories.findSalesTimeline(range);

  const timeline = rows.map((row, index) => {
    const value = Number(row.total);
    const prev = rows[index - 1];
    const prevTotal = prev ? Number(prev.total) : 0;
    const percentage = !prev
      ? 0
      : prevTotal === 0
        ? 100
        : Math.round(((value - prevTotal) / prevTotal) * 10000) / 100;

    return {
      date: row.date,
      value,
      percentage,
    };
  });

  return { timeline };
};
