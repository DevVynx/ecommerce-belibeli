import z from "zod";

import { validation } from "@/shared/middlewares/validation";

const body = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: z.string().min(6, "Nova senha deve ter no mínimo 6 caracteres"),
});

export const changePassword = validation({ body });
