import { ReviewsRepository } from "@/repositories/ReviewsRepository";
import { GetReviewsFromMovieController } from "./GetReviewsFromMovieController";
import { GetReviewsFromMovieUseCase } from "./GetReviewsFromMovieUseCase";
import { MoviesRepository } from "@/repositories/MovieRepository";
import { AccountRepository } from "@/repositories/AccountRepository";
import { GetMovieDetailUseCase } from "@/useCases/Movies/GetMovieDetail/GetMovieDetailUseCase";
import { GetAccountDetailsUseCase } from "@/useCases/Account/GetAccountDetails/GetAccountDetailsUseCase";

const reviewsRepository = new ReviewsRepository();
const moviesRepository = new MoviesRepository();
const accountRepository = new AccountRepository();

const getReviewsFromMovieUseCase = new GetReviewsFromMovieUseCase(
  reviewsRepository,
  moviesRepository
);
const getMovieDetailUseCase = new GetMovieDetailUseCase(moviesRepository);
const getAccountDetailsUseCase = new GetAccountDetailsUseCase(
  accountRepository
);

const getReviewsFromMovieController = new GetReviewsFromMovieController(
  getReviewsFromMovieUseCase,
  getMovieDetailUseCase,
  getAccountDetailsUseCase
);

export { getReviewsFromMovieController };
