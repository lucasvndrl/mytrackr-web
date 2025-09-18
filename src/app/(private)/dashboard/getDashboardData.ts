import { auth0 } from "@/lib/auth0";
import { AccountTable } from "@/types/dbTables";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { transformMoviesWithPoster } from "@/utils/transformMoviesWithPoster";

export interface DashboardData {
  user: AccountTable;
  movies: Movie[];
  reviews: Review[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const session = await auth0.getSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { token } = await auth0.getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    sub: session.user.sub,
  };

  const [userRes, moviesRes, reviewsRes] = await Promise.all([
    fetch(`/api/account/details`, {
      headers,
      cache: "no-store",
    }),
    fetch(`/api/movies/fetch`, {
      headers,
      cache: "no-store",
    }),
    fetch(`/api/reviews/fetch`, {
      headers,
      cache: "no-store",
    }),
  ]);

  if (!userRes.ok || !moviesRes.ok || !reviewsRes.ok) {
    throw new Error("Erro ao buscar dados");
  }

  const [user, movies, reviews] = await Promise.all([
    userRes.json(),
    moviesRes.json(),
    reviewsRes.json(),
  ]);

  const moviesWithPoster = transformMoviesWithPoster(movies);

  return { user, movies: moviesWithPoster, reviews };
}
