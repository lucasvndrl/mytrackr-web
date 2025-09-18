import { auth0 } from "@/lib/auth0";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { transformMoviesWithPoster } from "@/utils/transformMoviesWithPoster";

export interface MovieDetailData {
  movie: Movie;
  reviews: Review[];
}

export async function getMovieDetailData(
  movieId: string
): Promise<MovieDetailData> {
  const session = await auth0.getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { token } = await auth0.getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    sub: session.user.sub,
  };

  const [movieRes, reviewsRes] = await Promise.all([
    fetch(`/api/movies/${movieId}`, {
      headers,
      cache: "no-store",
    }),
    fetch(`/api/reviews/movie/${movieId}`, {
      headers,
      cache: "no-store",
    }),
  ]);

  if (!movieRes.ok || !reviewsRes.ok) {
    throw new Error("Erro ao buscar detalhes do filme");
  }

  const [movie, reviews] = await Promise.all([
    movieRes.json(),
    reviewsRes.json(),
  ]);

  const [movieWithPoster] = transformMoviesWithPoster([movie]);

  return { movie: movieWithPoster, reviews };
}
