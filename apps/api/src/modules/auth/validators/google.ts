import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  code: z.string("Código de autorização inválido.").min(1, "Código de autorização é obrigatório."),
});

export const google = validation({ body });
