import { dashboardRepositories } from "@/modules/dashboard/repositories";

export const getDaySummary = async () => {
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const endOfToday = new Date(startOfTomorrow(startOfToday));

  const [today, yesterday] = await Promise.all([
    dashboardRepositories.findDaySummary(startOfToday, endOfToday),
    dashboardRepositories.findDaySummary(startOfYesterday, startOfToday),
  ]);

  return {
    todayRevenue: today.revenue,
    yesterdayRevenue: yesterday.revenue,
    todayOrders: today.orders,
    yesterdayOrders: yesterday.orders,
  };
};

function startOfTomorrow(date: Date): Date {
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}
