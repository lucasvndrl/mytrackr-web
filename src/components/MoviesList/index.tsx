"use client";

import { Movie } from "@/types/movie";
import { useRouter } from "next/navigation";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const router = useRouter();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Movies</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className="flex bg-gray-800 rounded-lg shadow-md overflow-hidden min-w-[350px] max-w-[600px] flex-shrink-0"
          >
            <div className="relative w-32 h-48 flex-shrink-0">
              <img
                src={movie.poster || "/default-movie.png"}
                alt="Movie poster"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {movie.synopsis}
                </p>
              </div>

              <button
                onClick={() => router.push(`/movies/${movie.movie_id}`)}
                className="mt-4 text-sm font-medium text-blue-400 hover:underline self-start"
              >
                See details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
