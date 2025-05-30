import { IReviewsRepository } from "@/repositories/IReviewsRepository";

export class GetReviewDetailUseCase {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute(movieId: string) {
    const review = await this.reviewsRepository.getReviewDetail(movieId);

    return review;
  }
}
