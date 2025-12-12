import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const query = z.object({
  categoryId: z.uuid("Valor Inválido").optional(),
  offset: z.coerce.number("Valor Inválido").positive().optional(),
  limit: z.coerce.number("Valor Inválido").positive().max(100).optional(),
});

export const findAll = validation({ query });
