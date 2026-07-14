import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const query = z.object({
  q: z.string().optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
  sortBy: z.enum(["newest", "oldest", "expiring_soon", "usage_desc", "usage_asc"]).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export const searchCoupons = validation({ query });
