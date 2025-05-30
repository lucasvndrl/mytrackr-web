import { MoviesRepository } from "@/repositories/MovieRepository";
import { ReviewsRepository } from "@/repositories/ReviewsRepository";
import { CreateReviewUseCase } from "./CreateReviewUseCase";
import { CreateReviewController } from "./CreateReviewController";

const moviesRepository = new MoviesRepository();
const reviewsRepository = new ReviewsRepository();

const createReviewUseCase = new CreateReviewUseCase(
  reviewsRepository,
  moviesRepository
);

const createReviewController = new CreateReviewController(
  createReviewUseCase,
  moviesRepository
);

export { createReviewController };
