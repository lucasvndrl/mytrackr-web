import { GetAccountDetailsUseCase } from "@/useCases/Account/GetAccountDetails/GetAccountDetailsUseCase";
import { GetMovieDetailUseCase } from "@/useCases/Movies/GetMovieDetail/GetMovieDetailUseCase";
import { GetAllReviewsDTO } from "./GetAllReviewsDTO";
import { ReviewsTable } from "@/types/dbTables";
import { GetAllReviewsUseCase } from "./GetAllReviewsUseCase";

export class GetAllReviewsController {
  constructor(
    private getAllReviewsUseCase: GetAllReviewsUseCase,
    private getMovieDetailsUseCase: GetMovieDetailUseCase,
    private getAccountDetailsUseCase: GetAccountDetailsUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const reviews = await this.getAllReviewsUseCase.execute();
      const transformedReviews = await this.transformResponse(reviews);

      return Response.json(transformedReviews, { status: 200 });
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
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
      console.log(reviewerAccount, "reviewerAccount");
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
