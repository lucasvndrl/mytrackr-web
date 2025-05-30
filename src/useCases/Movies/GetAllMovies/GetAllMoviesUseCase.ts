import { IMoviesRepository } from "@/repositories/IMoviesRepository";
import { MoviesTable } from "@/types/dbTables";

export class GetAllMoviesUseCase {
  constructor(private moviesRepository: IMoviesRepository) {}

  async execute(): Promise<MoviesTable[]> {
    return await this.moviesRepository.getMovies();
  }
}
