import { createReviewSchema } from "@/schemas/reviewsSchema";
import { createReviewController } from "@/useCases/Reviews/CreateReview";
import { CreateReviewDTO } from "@/useCases/Reviews/CreateReview/CreateReviewDTO";
import { ensureAuthenticated } from "@/utils/tokenHandler";
import { z } from "zod";

export async function POST(request: Request, response: Response) {
  const isAuthenticated = await ensureAuthenticated(request);
  if (!isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as CreateReviewDTO;
    createReviewSchema.parse(body);
    return await createReviewController.handle(body, response);
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
}
