export type ReviewDto = {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
};

export type GetReviewsResponse = {
  reviews: ReviewDto[];
  pagination: { total: number; offset: number; limit: number; hasMore: boolean };
};
