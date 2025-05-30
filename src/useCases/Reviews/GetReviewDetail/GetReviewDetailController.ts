import { GetReviewDetailUseCase } from "./GetReviewDetailUseCase";

export class GetReviewDetailController {
  constructor(private getReviewDetailUseCase: GetReviewDetailUseCase) {}

  async handle(request: Request, reviewId: string): Promise<Response> {
    try {
      const review = await this.getReviewDetailUseCase.execute(reviewId);

      return Response.json(review, { status: 200 });
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
