import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const query = z.object({
  range: z.enum(["1W", "1M", "3M", "6M", "1Y", "ALL"]).default("1M"),
});

export const stats = validation({ query });
