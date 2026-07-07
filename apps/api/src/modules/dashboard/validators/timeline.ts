import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const query = z.object({
  range: z.enum(["1D", "1W", "1M", "3M", "6M"]),
});

export const timeline = validation({ query });
