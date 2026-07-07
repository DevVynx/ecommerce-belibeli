import { Router } from "express";

import { stats, timeline } from "@/modules/dashboard/controllers";
import v from "@/modules/dashboard/validators";
import { adminOnlyMiddleware } from "@/shared/middlewares/adminOnly";
import { authMiddleware } from "@/shared/middlewares/auth";

const dashboardRouter: Router = Router();

dashboardRouter.get(
  "/admin/dashboard/stats",
  authMiddleware,
  adminOnlyMiddleware,
  v.stats.middleware,
  stats
);

dashboardRouter.get(
  "/admin/dashboard/timeline",
  authMiddleware,
  adminOnlyMiddleware,
  v.timeline.middleware,
  timeline
);

export { dashboardRouter };
