import ReviewList from "@/components/ReviewsList";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMovieDetailData } from "./getMovieDetailData";
import Link from "next/link";
import RatingInfo from "@/components/RatingInfo";

export default async function MovieDetailsPage(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;
  const { movie, reviews } = await getMovieDetailData(id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="p-6 text-white space-y-10">
      <section className="flex flex-col md:flex-row gap-6 items-start">
        <div className="relative w-48 h-72 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={movie.poster || "/default-movie.png"}
            alt="Movie poster"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-300">{movie.synopsis}</p>
          <div className="text-sm text-gray-400 space-y-1">
            <p>
              <strong>Directed by:</strong> {movie.directed_by}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration} min
            </p>
            <div className="flex items-center gap-1">
              <strong className="align-middle">Rating:</strong>
              <div className="align-middle">
                <RatingInfo rating={movie.rating} />
              </div>
            </div>
          </div>
          <div className="flex pt-6 ">
            <Link
              href={`/reviews/create/${movie.movie_id}`}
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition"
            >
              + Create Review
            </Link>
          </div>
        </div>
      </section>

      <ReviewList reviews={reviews} />
    </div>
  );
}
