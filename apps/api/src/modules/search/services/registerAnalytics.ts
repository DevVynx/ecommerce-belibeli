import { searchRepositories } from "@/modules/search/repositories";
import type { RegisterAnalyticsParams } from "@/modules/search/types/ServiceParams";

export const registerAnalytics = async ({ term }: RegisterAnalyticsParams) => {
  const suggestion = await searchRepositories.upsertSuggestion({ term });

  return { suggestion };
};
