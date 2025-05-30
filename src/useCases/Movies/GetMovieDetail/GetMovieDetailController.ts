import { GetReviewsFromMovieUseCase } from "@/useCases/Reviews/GetReviewsFromMovie/GetReviewsFromMovieUseCase";
import { GetMovieDetailUseCase } from "./GetMovieDetailUseCase";

export class GetMovieDetailController {
  constructor(
    private getMovieDetailUseCase: GetMovieDetailUseCase,
    private getReviewsFromMovieUseCase: GetReviewsFromMovieUseCase
  ) {}

  async handle(request: Request, movieId: string): Promise<Response> {
    try {
      const movie = await this.getMovieDetailUseCase.execute(movieId);

      const movieReviews = await this.getReviewsFromMovieUseCase.execute(
        movieId
      );

      movie.rating =
        movieReviews
          .filter((review) => review.movie_id === movieId)
          .reduce((acc, review) => acc + review.rating, 0) /
          movieReviews.length || movie.rating;

      if (movie === undefined) {
        return Response.json(
          {
            message: "Movie not found.",
          },
          { status: 404 }
        );
      }

      return Response.json(movie, { status: 200 });
    } catch (error: any) {
      return Response.json(
        {
          message: error.message || "Unexpected error.",
        },
        { status: error.statusCode || 500 }
      );
    }
  }
}
