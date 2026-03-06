/**
 * Estrutura exata do JSON retornado pelo handleGlobalError do backend
 * Incluindo o status HTTP para controle fino no frontend
 */
export interface ApiErrorResponse {
  status: number; // Código HTTP (ex: 400, 401, 500)
  error: string; // Nome da classe de erro (ex: BadRequestError)
  message: string | Record<string, unknown>; // Mensagem ou objeto com detalhes
  code?: string; // Código de erro interno (opcional)
}
