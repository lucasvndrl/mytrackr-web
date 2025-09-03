import { auth0 } from "@/lib/auth0";
import ReviewForm from "../createReviewForm";
import { Movie } from "@/types/movie";

export default async function CreateReviewPage(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;
  const session = await auth0.getSession();
  const APP_URL = process.env.APP_BASE_URL;

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { token } = await auth0.getAccessToken();

  const res = await fetch(`${APP_URL}/api/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      sub: session.user.sub,
    },
  });

  const movie = (await res.json()) as Movie;
  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-white p-4">
        <h1 className="text-2xl font-bold">Movie not found</h1>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-white p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Write review for
          <span className="block text-indigo-400">{movie.title}</span>
        </h1>
        <ReviewForm movieId={id} token={token} />
      </div>
    </div>
  );
}
