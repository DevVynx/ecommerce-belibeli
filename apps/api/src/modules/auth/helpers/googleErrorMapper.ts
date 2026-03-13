import { gaxios } from "google-auth-library";

import { BadRequestError, InternalServerError } from "@/shared/utils/HttpErrors";

export const handleGoogleAuthError = (error: unknown): never => {
  if (error instanceof gaxios.GaxiosError) {
    const status = error.response?.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorData = error.response?.data as any;

    const oauthError = errorData?.error;

    if (status === 400 || oauthError === "invalid_grant") {
      throw new BadRequestError("Código de autorização inválido ou expirado.");
    }

    if (status === 401 || status === 403) {
      throw new BadRequestError("Falha na autorização com o Google. Verifique as credenciais.");
    }
  }

  console.error("[Google Auth Error]:", error);
  throw new InternalServerError("Ocorreu um erro inesperado ao autenticar com o Google.");
};
