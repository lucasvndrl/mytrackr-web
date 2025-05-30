import { db } from "@/db";
import { IReviewsRepository } from "./IReviewsRepository";
import { ReviewsTable } from "@/types/dbTables";

export class ReviewsRepository implements IReviewsRepository {
  private repo = db;
  async save(review: ReviewsTable): Promise<void> {
    await this.repo.transaction().execute(async (trx) => {
      await trx
        .insertInto("reviews")
        .values({
          review_id: review.review_id,
          movie_id: review.movie_id,
          review_text: review.review_text,
          rating: review.rating,
          reviewer: review.reviewer,
          review_created: review.review_created,
        })
        .execute();
    });
  }

  async getReviews(movieId: string): Promise<ReviewsTable[]> {
    const reviews = await this.repo
      .selectFrom("reviews")
      .selectAll()
      .where("movie_id", "=", movieId)
      .orderBy("review_created", "desc")
      .execute();

    return reviews as ReviewsTable[];
  }

  async getAllReviews(): Promise<ReviewsTable[]> {
    const reviews = await this.repo
      .selectFrom("reviews")
      .selectAll()
      .orderBy("review_created", "desc")
      .execute();

    return reviews as ReviewsTable[];
  }

  async getReviewDetail(reviewId: string): Promise<ReviewsTable | null> {
    const review = await this.repo
      .selectFrom("reviews")
      .selectAll()
      .where("review_id", "=", reviewId)
      .executeTakeFirst();

    return review as ReviewsTable;
  }
}
