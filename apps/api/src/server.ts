import { startAllCronJobs } from "@/jobs";
import { ENV } from "@/shared/utils/env";

import { app } from "./app";

const port = ENV.PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}/api 🚀`);

  startAllCronJobs();
});
