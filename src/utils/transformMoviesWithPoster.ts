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
    movieId: "c3a0dfaa-b21b-4c6a-b6ff-847fab3a5e6c",
    img: "/batman.png",
  },
  {
    movieId: "052ce8a1-5409-4e03-81cf-f98651cf515e",
    img: "/dontlookup.png",
  },
  {
    movieId: "6f1a2c58-b20a-48cd-a152-881e6693a97c",
    img: "/frenchdispatch.png",
  },
  {
    movieId: "a629195e-a702-45f8-92ca-f4daa6c45cc5",
    img: "/nowayhome.png",
  },
  {
    movieId: "a9151154-c6ac-42be-8055-53a1d072fc77",
    img: "/thepower.png",
  },
];
