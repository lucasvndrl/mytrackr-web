import { IMoviesRepository } from "../../../repositories/IMoviesRepository";

export class GetMovieDetailUseCase {
  constructor(private moviesRepository: IMoviesRepository) {}

  async execute(movieId: string) {
    const movie = await this.moviesRepository.getMoveDetails(movieId);

    return movie;
  }
}
