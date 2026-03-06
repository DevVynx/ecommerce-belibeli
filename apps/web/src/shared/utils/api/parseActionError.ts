import type { ApiErrorResponse } from "@/shared/types/api/error";

/**
 * Utilitário para centralizar a extração de erros de uma Server Action ou fetchClient.
 * Delegando a lógica de tratamento e garantindo que o erro seja serializável para o Cliente.
 * Agora focado em erros de rede e exceções do fetch nativo.
 */
export function parseActionError(error: unknown): ApiErrorResponse {
  // Verificamos se é um erro de rede (Ex: servidor fora do ar)
  const isNetworkError =
    error instanceof TypeError || (error instanceof Error && error.name === "AbortError");

  if (isNetworkError) {
    return {
      status: 503,
      error: "NetworkError",
      message: "Não foi possível conectar ao servidor. Verifique sua conexão.",
      code: "SERVICE_UNAVAILABLE",
    };
  }

  // Fallback para qualquer outro erro interno ou inesperado
  return {
    status: 500,
    error: "InternalError",
    message: error instanceof Error ? error.message : "Erro interno inesperado.",
    code: "INTERNAL_SERVER_ERROR",
  };
}
