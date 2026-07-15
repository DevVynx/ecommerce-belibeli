export type SearchSuggestionDto = {
  id: string;
  term: string;
  searchCount: number;
};

export type SearchSuggestionsResponse = {
  suggestions: SearchSuggestionDto[];
};

export type RegisterAnalyticsResponse = {
  suggestion: {
    id: string;
    term: string;
    searchCount: number;
  };
};
