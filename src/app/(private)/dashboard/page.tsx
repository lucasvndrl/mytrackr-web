import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { getDashboardData } from "./getDashboardData";
import MovieList from "@/components/MoviesList";
import ReviewList from "@/components/ReviewsList";

export default async function Dashboard() {
  const session = await auth0.getSession();
  const { user, movies, reviews } = await getDashboardData();

  if (!user) {
    redirect("credentialscheck");
  }

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-screen min-h-screen bg-gray-900 text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        🎬 Welcome, {user.username}
      </h1>
      <MovieList movies={movies} />

      <ReviewList reviews={reviews} />
    </div>
  );
}
