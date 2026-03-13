import { deleteExpiredRefreshTokens } from "@/modules/auth/repositories/deleteExpiredRefreshTokens";
import type { CronJob } from "@/types/CronJob";

export const cleanupRefreshTokensJob: CronJob = {
  name: "Limpeza de Refresh Tokens Expirados",
  schedule: "0 3 * * *",
  execute: async () => {
    try {
      console.log("🧹 Iniciando limpeza de tokens expirados...");
      const result = await deleteExpiredRefreshTokens();
      console.log(`✅ Limpeza concluída com sucesso: ${result.count} tokens expirados!`);
    } catch (error) {
      console.error("❌ Erro na limpeza de tokens:", error);
    }
  },
};
