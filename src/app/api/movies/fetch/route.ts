import { getAllMoviesController } from "@/useCases/Movies/GetAllMovies";
import { ensureAuthenticated } from "@/utils/tokenHandler";

export async function GET(request: Request, response: Response) {
  const isAuthenticated = await ensureAuthenticated(request);

  if (!isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  return await getAllMoviesController.handle(request, response);
}
