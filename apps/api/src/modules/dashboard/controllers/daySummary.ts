import type { AdminDaySummaryResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { dashboardServices } from "@/modules/dashboard/services";

export const daySummary: RequestHandler = async (_req, res: Response<AdminDaySummaryResponse>) => {
  const data = await dashboardServices.getDaySummary();

  res.json(data);
};
