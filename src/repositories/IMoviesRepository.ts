import { MoviesTable } from "@/types/dbTables";

export interface IMoviesRepository {
  getMovies(): Promise<MoviesTable[]>;
  getMoveDetails(movieId: string): Promise<MoviesTable>;
  updateMovieRating(movieId: string, rating: number): Promise<void>;
}
