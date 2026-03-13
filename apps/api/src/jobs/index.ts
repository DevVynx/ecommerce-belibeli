import cron from "node-cron";

import { cleanupRefreshTokensJob } from "./cleanupRefreshTokens";

const registeredJobs = [cleanupRefreshTokensJob];

export const startAllCronJobs = () => {
  console.log("⚙️ Iniciando motor de Cron Jobs...");

  registeredJobs.forEach((job) => {
    cron.schedule(job.schedule, async () => {
      console.log(`▶️ Executando job: [${job.name}]`);
      await job.execute();
    });

    console.log(`⏱️ Job [${job.name}] agendado com sucesso (${job.schedule})`);
  });
};
