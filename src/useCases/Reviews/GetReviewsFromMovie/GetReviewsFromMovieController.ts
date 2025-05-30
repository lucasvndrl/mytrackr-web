import { ReviewsTable } from "@/types/dbTables";
import { GetReviewsFromMovieUseCase } from "./GetReviewsFromMovieUseCase";
import { GetAllReviewsDTO } from "../GetAllReviews/GetAllReviewsDTO";
import { GetMovieDetailUseCase } from "@/useCases/Movies/GetMovieDetail/GetMovieDetailUseCase";
import { GetAccountDetailsUseCase } from "@/useCases/Account/GetAccountDetails/GetAccountDetailsUseCase";

export class GetReviewsFromMovieController {
  constructor(
    private getReviewsFromMovieUseCase: GetReviewsFromMovieUseCase,
    private getMovieDetailsUseCase: GetMovieDetailUseCase,
    private getAccountDetailsUseCase: GetAccountDetailsUseCase
  ) {}

  async handle(request: Request, movieId: string): Promise<Response> {
    try {
      const reviews = await this.getReviewsFromMovieUseCase.execute(movieId);
      const transformedReviews = await this.transformResponse(reviews);

      return Response.json(transformedReviews, { status: 200 });
    } catch (error: any) {
      return Response.json(
        {
          message: error.message || "Unexpected error.",
        },
        { status: error.statusCode || 500 }
      );
    }
  }

  async transformResponse(reviews: ReviewsTable[]) {
    const transformedResponse = reviews.map(async (review) => {
      const movie = await this.getMovieDetailsUseCase.execute(review.movie_id);
      let reviewerAccount;
      if (review.reviewer !== null) {
        reviewerAccount = await this.getAccountDetailsUseCase.execute(
          review.reviewer
        );
      }
      return {
        review_id: review.review_id,
        movie_id: review.movie_id,
        review_text: review.review_text,
        rating: review.rating,
        reviewer: review.reviewer ?? null,
        movie_title: movie.title,
        review_date: review.review_created,
        reviewer_name: reviewerAccount?.username ?? "",
        reviewer_avatar: reviewerAccount?.avatar ?? "",
      } as GetAllReviewsDTO;
    });

    return Promise.all(transformedResponse);
  }
}
