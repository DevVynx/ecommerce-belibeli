export type GetProductsRequest = {
  categoryId?: string;
  offset?: number;
  limit?: number;
  onSale?: boolean;
};

export type GetProductDetailsRequest = {
  productId: string;
};

export type GetProductBySlugRequest = {
  slug: string;
};

export type SearchProductsRequest = {
  q?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  minRating?: number;
  optionValueIds?: string;
  sortBy?: "price_asc" | "price_desc" | "rating_desc" | "newest";
  offset?: number;
  limit?: number;
};
