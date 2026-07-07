import { dashboardRepositories } from "@/modules/dashboard/repositories";

export const getStats = async () => {
  const currentSales = await dashboardRepositories.findCurrentMonthSales();
  const previousSales = await dashboardRepositories.findPreviousMonthSales();

  const percentageDelta =
    previousSales === 0
      ? 100
      : Math.round(((currentSales - previousSales) / previousSales) * 10000) / 100;

  return { currentSales, percentageDelta };
};
