import type { AdminDashboardTimelineResponse } from "@repo/types/contracts";
import type { RequestHandler, Response } from "express";

import { dashboardServices } from "@/modules/dashboard/services";
import v from "@/modules/dashboard/validators";

export const timeline: RequestHandler = async (
  req,
  res: Response<AdminDashboardTimelineResponse>
) => {
  const { range } = v.timeline.getValidatedValues(req).query;

  const { timeline } = await dashboardServices.getTimeline(range);

  res.json({ timeline });
};
