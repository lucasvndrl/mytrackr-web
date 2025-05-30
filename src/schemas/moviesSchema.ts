import { z } from "zod";

const getMovieByIdSchema = z.object({
  movieId: z.string().refine((value) => !isNaN(parseInt(value)), {
    message: "movieId must be a valid number",
  }),
});

export { getMovieByIdSchema };
