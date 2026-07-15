import { findSuggestions } from "@/modules/search/repositories/findSuggestions";
import { upsertSuggestion } from "@/modules/search/repositories/upsertSuggestion";

export const searchRepositories = { upsertSuggestion, findSuggestions };
