import { getReviewsFromMovieSchema } from "@/schemas/reviewsSchema";
import { getReviewDetailController } from "@/useCases/Reviews/GetReviewDetail";
import { getReviewsFromMovieController } from "@/useCases/Reviews/GetReviewsFromMovie";
import { ensureAuthenticated } from "@/utils/tokenHandler";
import { z } from "zod";

export async function GET(
  request: Request,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context;
  const reviewId = params.id;
  const isAuthenticated = await ensureAuthenticated(request);
  if (!isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  return await getReviewDetailController.handle(request, reviewId);
}
