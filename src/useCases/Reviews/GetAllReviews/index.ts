import { AccountRepository } from "@/repositories/AccountRepository";
import { MoviesRepository } from "@/repositories/MovieRepository";
import { ReviewsRepository } from "@/repositories/ReviewsRepository";
import { GetAllReviewsUseCase } from "./GetAllReviewsUseCase";
import { GetMovieDetailUseCase } from "@/useCases/Movies/GetMovieDetail/GetMovieDetailUseCase";
import { GetAccountDetailsUseCase } from "@/useCases/Account/GetAccountDetails/GetAccountDetailsUseCase";
import { GetAllReviewsController } from "./GetAllReviewsController";

const reviewsRepository = new ReviewsRepository();
const moviesRepository = new MoviesRepository();
const accountRepository = new AccountRepository();

const getAllReviewsUseCase = new GetAllReviewsUseCase(reviewsRepository);
const getMovieDetailUseCase = new GetMovieDetailUseCase(moviesRepository);
const getAccountDetailsUseCase = new GetAccountDetailsUseCase(
  accountRepository
);

const getAllReviewsController = new GetAllReviewsController(
  getAllReviewsUseCase,
  getMovieDetailUseCase,
  getAccountDetailsUseCase
);

export { getAllReviewsController };
