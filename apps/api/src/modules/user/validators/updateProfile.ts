import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
});

export const updateProfile = validation({ body });
