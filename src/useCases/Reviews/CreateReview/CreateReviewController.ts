import { IMoviesRepository } from "@/repositories/IMoviesRepository";
import { randomUUID } from "crypto";
import { CreateReviewUseCase } from "./CreateReviewUseCase";
import { CreateReviewDTO } from "./CreateReviewDTO";

export class CreateReviewController {
  constructor(
    private createReviewUseCase: CreateReviewUseCase,
    private moviesRepository: IMoviesRepository
  ) {}

  async handle(body: CreateReviewDTO, response: Response): Promise<Response> {
    // const reqBody = await request.json();
    const reviewId = randomUUID();

    try {
      await this.createReviewUseCase.execute({
        movie_id: body.movie_id,
        rating: body.rating,
        review_id: reviewId,
        review_text: body.review_text,
        reviewer: body.reviewer,
        review_created: new Date(),
      });

      const movie = await this.moviesRepository.getMoveDetails(body.movie_id);

      const newMovieRating = Math.round((movie.rating + body.rating) / 2);

      await this.moviesRepository.updateMovieRating(
        body.movie_id,
        newMovieRating
      );

      return Response.json(
        {
          message: "Review created successfully.",
        },
        { status: 201 }
      );
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
