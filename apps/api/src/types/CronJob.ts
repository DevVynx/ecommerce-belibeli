export interface CronJob {
  name: string;
  schedule: string;
  execute: () => Promise<void>;
}
