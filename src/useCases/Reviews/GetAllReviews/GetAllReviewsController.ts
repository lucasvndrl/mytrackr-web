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

      // let avatarBase64: string | null = null;
      // if (reviewerAccount?.avatar) {
      //   if (reviewerAccount.avatar instanceof Buffer) {
      //     avatarBase64 = reviewerAccount.avatar.toString("base64");
      //   } else if (reviewerAccount.avatar instanceof Blob) {
      //     const arrayBuffer = await reviewerAccount.avatar.arrayBuffer();
      //     avatarBase64 = Buffer.from(arrayBuffer).toString("base64");
      //   } else {
      //     const serialized = reviewerAccount.avatar as {
      //       type: "Buffer";
      //       data: number[];
      //     };
      //     avatarBase64 = Buffer.from(serialized.data).toString("base64");
      //   }
      // }
      // console.log("Avatar base64 length:", avatarBase64?.length);
      // console.log("Avatar base64 sample:", avatarBase64?.substring(0, 50));
      // console.log(
      //   "Final reviewer_avatar:",
      //   `data:image/jpeg;base64,${avatarBase64}`.substring(0, 100)
      // );
      return {
        review_id: review.review_id,
        movie_id: review.movie_id,
        review_text: review.review_text,
        rating: review.rating,
        reviewer: review.reviewer ?? null,
        movie_title: movie.title,
        review_date: review.review_created,
        reviewer_name: reviewerAccount?.username ?? "",
        reviewer_avatar: reviewerAccount?.avatar ?? null,
      } as GetAllReviewsDTO;
    });

    return Promise.all(transformedResponse);
  }
}
