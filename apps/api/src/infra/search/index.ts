import { ENV } from "@/shared/utils/env";

import { MeilisearchAdapter } from "./meilisearch";

export const searchEngine = new MeilisearchAdapter({
  host: ENV.MEILI_HOST,
  apiKey: ENV.MEILI_MASTER_KEY,
});

export type { SearchEngine, SearchHit, SearchParams, SearchResult } from "./types";
