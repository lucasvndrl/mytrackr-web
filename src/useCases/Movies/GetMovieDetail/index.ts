import { MoviesRepository } from "@/repositories/MovieRepository";
import { GetMovieDetailController } from "./GetMovieDetailController";
import { GetMovieDetailUseCase } from "./GetMovieDetailUseCase";
import { ReviewsRepository } from "@/repositories/ReviewsRepository";
import { GetReviewsFromMovieUseCase } from "@/useCases/Reviews/GetReviewsFromMovie/GetReviewsFromMovieUseCase";

const moviesRepository = new MoviesRepository();
const reviewsRepository = new ReviewsRepository();

const getMovieDetailUseCase = new GetMovieDetailUseCase(moviesRepository);
const getReviewsFromMovieUseCase = new GetReviewsFromMovieUseCase(
  reviewsRepository,
  moviesRepository
);

const getMovieDetailController = new GetMovieDetailController(
  getMovieDetailUseCase,
  getReviewsFromMovieUseCase
);

export { getMovieDetailController };
