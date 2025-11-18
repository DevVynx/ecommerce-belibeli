import { validation } from "@/shared/middlewares/validation.js";
import z from "zod";

const querySchema = z.object({
  categoryId: z.coerce.number().positive().optional(),
  offset: z.coerce.number().positive().optional(),
  limit: z.coerce.number().positive().max(100).optional(),
});

const paramSchema = z.object({
  teste: z.coerce.number().positive(),
});

const { middleware: validator, getValidatedValues } = validation({ query: querySchema, params: paramSchema });

export { validator, getValidatedValues };
