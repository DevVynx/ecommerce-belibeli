import { validation } from "@/shared/middlewares/validation";
import z from "zod";

const body = z
  .object({
    name: z.string("Campo obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z.email("E-mail inválido."),
    password: z
      .string("Campo obrigatório")
      .min(6, "A senha precisa ter pelo menos 6 caracteres.")
      .regex(/[a-zA-Z]/, "A senha deve conter pelo menos uma letra.")
      .regex(/\d/, "A senha deve conter pelo menos um número."),
    confirmPassword: z.string("Confirme a sua senha."),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    error: "As senhas não coincidem",
  });

export const register = validation({ body });
