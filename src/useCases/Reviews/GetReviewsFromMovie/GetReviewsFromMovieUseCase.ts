import { IMoviesRepository } from "@/repositories/IMoviesRepository";
import { IReviewsRepository } from "@/repositories/IReviewsRepository";

export class GetReviewsFromMovieUseCase {
  constructor(
    private reviewsRepository: IReviewsRepository,
    private moviesRepository: IMoviesRepository
  ) {}

  async execute(movieId: string) {
    const movie = await this.moviesRepository.getMoveDetails(movieId);

    if (!movie) {
      throw new Error("Movie not found.");
    }

    const reviews = await this.reviewsRepository.getReviews(movieId);

    return reviews;
  }
}
