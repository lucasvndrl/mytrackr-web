import { z } from "zod";

const createReviewSchema = z.object({
  movie_id: z.string().refine((value) => !isNaN(parseInt(value)), {
    message: "movieId must be a valid number",
  }),
  review_text: z
    .string()
    .min(15, { message: "Review must contain at least 15 characters" })
    .max(250, {
      message: "Review must contain less than 250 characters",
    }),
  reviewer: z.string(),
  rating: z.number().int().min(1).max(5),
});

const getReviewsFromMovieSchema = z.object({
  movieId: z.string().refine((value) => !isNaN(parseInt(value)), {
    message: "movieId must be a valid number",
  }),
});

export { createReviewSchema, getReviewsFromMovieSchema };
