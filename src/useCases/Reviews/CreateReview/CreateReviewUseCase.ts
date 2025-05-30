import { IMoviesRepository } from "@/repositories/IMoviesRepository";
import { IReviewsRepository } from "@/repositories/IReviewsRepository";
import { ReviewsTable } from "@/types/dbTables";

export class CreateReviewUseCase {
  constructor(
    private reviewsRepository: IReviewsRepository,
    private moviesRepository: IMoviesRepository
  ) {}

  async execute(data: ReviewsTable) {
    const movie = await this.moviesRepository.getMoveDetails(data.movie_id);

    if (!movie) {
      throw new Error("Movie does not exist.");
    }

    await this.reviewsRepository.save(data);
  }
}
