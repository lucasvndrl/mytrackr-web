import { getReviewsFromMovieSchema } from "@/schemas/reviewsSchema";
import { getReviewsFromMovieController } from "@/useCases/Reviews/GetReviewsFromMovie";
import { ensureAuthenticated } from "@/utils/tokenHandler";
import { z } from "zod";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const isAuthenticated = await ensureAuthenticated(request);
  if (!isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    getReviewsFromMovieSchema.parse({ movieId: id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        { message: err.errors[0].message },
        {
          status: 400,
        }
      );
    }
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
  return await getReviewsFromMovieController.handle(request, id);
}
