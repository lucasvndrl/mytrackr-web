import { auth0 } from "@/lib/auth0";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { transformMoviesWithPoster } from "@/utils/transformMoviesWithPoster";

export interface ReviewDetailData {
  movie: Movie;
  review: Review;
}

export async function getReviewDetail(
  reviewId: string
): Promise<ReviewDetailData> {
  const session = await auth0.getSession();
  const APP_URL = process.env.APP_BASE_URL;

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { token } = await auth0.getAccessToken();

  const headers = {
    Authorization: `Bearer ${token}`,
    sub: session.user.sub,
  };

  const reviewRes = await fetch(`${APP_URL}/api/reviews/${reviewId}`, {
    headers,
    cache: "no-store",
  });

  if (!reviewRes.ok) {
    throw new Error("Erro ao buscar a review");
  }

  const review = await reviewRes.json();

  const movieRes = await fetch(`${APP_URL}/api/movies/${review.movie_id}`, {
    headers,
    cache: "no-store",
  });

  if (!movieRes.ok) {
    throw new Error("Erro ao buscar o filme da review");
  }

  const movie = await movieRes.json();
  const [movieWithPoster] = transformMoviesWithPoster([movie]);

  return { review, movie: movieWithPoster };
}
