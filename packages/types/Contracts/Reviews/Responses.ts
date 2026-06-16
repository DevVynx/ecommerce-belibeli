export type ReviewDto = {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
};

export type GetReviewsResponse = {
  reviews: ReviewDto[];
  pagination: { total: number; hasMore: boolean };
};
