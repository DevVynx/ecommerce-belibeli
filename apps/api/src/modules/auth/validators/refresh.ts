import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  refreshToken: z.jwt("Token inválido.").min(1, "Token é obrigatório."),
});

export const refresh = validation({ body });
