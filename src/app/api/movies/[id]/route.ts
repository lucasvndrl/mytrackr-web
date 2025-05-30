import { getMovieByIdSchema } from "@/schemas/moviesSchema";
import { getMovieDetailController } from "@/useCases/Movies/GetMovieDetail";
import { ensureAuthenticated } from "@/utils/tokenHandler";
import { z } from "zod";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { valid, sub } = await ensureAuthenticated(request);
  if (!valid || !sub) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    getMovieByIdSchema.parse({ movieId: id });
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

  return await getMovieDetailController.handle(request, id);
}
