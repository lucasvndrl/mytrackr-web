import { ReviewsRepository } from "@/repositories/ReviewsRepository";
import { MoviesRepository } from "@/repositories/MovieRepository";
import { GetReviewDetailController } from "./GetReviewDetailController";
import { GetReviewDetailUseCase } from "./GetReviewDetailUseCase";

const reviewsRepository = new ReviewsRepository();

const getReviewDetailUseCase = new GetReviewDetailUseCase(reviewsRepository);

const getReviewDetailController = new GetReviewDetailController(
  getReviewDetailUseCase
);

export { getReviewDetailController };
