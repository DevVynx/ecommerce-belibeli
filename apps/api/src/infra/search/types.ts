export type SearchParams = {
  query: string;
  filters?: string[];
  sort?: string[];
  limit?: number;
  offset?: number;
};

export type SearchHit = Record<string, unknown>;

export type SearchResult = {
  hits: SearchHit[];
  totalHits: number;
};

export interface SearchEngine {
  search(index: string, params: SearchParams): Promise<SearchResult>;
}
