export function transformMoviesWithPoster(movies: any[]): any[] {
  return movies.map((movie) => {
    const posterMatch = posters.find((p) => p.movieId === movie.movie_id);
    return {
      ...movie,
      poster: posterMatch ? posterMatch.img : "/default-movie.png",
    };
  });
}

const posters = [
  {
    movieId: "1",
    img: "/batman.png",
  },
  {
    movieId: "2",
    img: "/dontlookup.png",
  },
  {
    movieId: "3",
    img: "/frenchdispatch.png",
  },
  {
    movieId: "4",
    img: "/nowayhome.png",
  },
  {
    movieId: "5",
    img: "/thepower.png",
  },
];
