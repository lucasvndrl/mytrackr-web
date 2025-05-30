import { db } from "@/db";
import { MoviesTable } from "@/types/dbTables";

export class MoviesRepository {
  private repo = db;

  async getMovies(): Promise<MoviesTable[]> {
    return await this.repo.selectFrom("movies").selectAll().execute();
  }

  async getMoveDetails(movieId: string): Promise<MoviesTable> {
    const movie = await this.repo
      .selectFrom("movies")
      .selectAll()
      .where("movie_id", "=", movieId)
      .executeTakeFirst();

    return movie as MoviesTable;
  }

  async updateMovieRating(movieId: string, rating: number): Promise<void> {
    await this.repo
      .updateTable("movies")
      .set("rating", rating)
      .where("movie_id", "=", movieId)
      .execute();
  }
}
