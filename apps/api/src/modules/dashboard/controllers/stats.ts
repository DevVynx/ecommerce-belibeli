import type { AdminDashboardStatsResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { dashboardServices } from "@/modules/dashboard/services";

export const stats: RequestHandler = async (_req, res: Response<AdminDashboardStatsResponse>) => {
  const { currentSales, percentageDelta } = await dashboardServices.getStats();

  res.json({ currentSales, percentageDelta });
};
