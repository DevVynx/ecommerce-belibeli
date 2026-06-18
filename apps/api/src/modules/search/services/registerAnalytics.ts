import { searchEngine } from "@/infra/search";
import { searchRepositories } from "@/modules/search/repositories";
import type { RegisterAnalyticsParams } from "@/modules/search/types/ServiceParams";

export const registerAnalytics = async ({ term }: RegisterAnalyticsParams) => {
  const suggestion = await searchRepositories.upsertSuggestion({ term });

  await searchEngine.addDocuments("suggestions", [
    { id: suggestion.id, term: suggestion.term, searchCount: suggestion.searchCount },
  ]);

  return { suggestion };
};
