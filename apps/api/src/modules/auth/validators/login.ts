import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  email: z.email("E-mail inválido.").min(1, "O e-mail é obrigatório."),
  password: z
    .string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .regex(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra.")
    .regex(/\d/, "A senha deve conter pelo menos um número."),
});

export const login = validation({ body });
