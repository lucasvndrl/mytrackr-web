import { ReviewsTable } from "@/types/dbTables";

export interface IReviewsRepository {
  save(review: ReviewsTable): Promise<void>;
  getReviews(movieId: string): Promise<ReviewsTable[]>;
  getAllReviews(): Promise<ReviewsTable[]>;
  getReviewDetail(reviewId: string): Promise<ReviewsTable | null>;
}
