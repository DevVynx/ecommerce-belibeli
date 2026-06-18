import { db } from "@/shared/lib/db";

type UpsertSuggestionParams = { term: string };

export const upsertSuggestion = async ({ term }: UpsertSuggestionParams) => {
  const suggestion = await db.searchSuggestion.upsert({
    where: { term },
    create: { term },
    update: { searchCount: { increment: 1 } },
  });

  return suggestion;
};
