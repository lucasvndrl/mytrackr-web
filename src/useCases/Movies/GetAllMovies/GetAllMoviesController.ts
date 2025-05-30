import { GetAllMoviesUseCase } from "./GetAllMoviesUseCase";

export class GetAllMoviesController {
  constructor(private getAllMoviesUseCase: GetAllMoviesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const movies = await this.getAllMoviesUseCase.execute();

      return Response.json(movies, { status: 200 });
    } catch (error: any) {
      return Response.json(
        {
          message: error.message || "Unexpected error.",
        },
        { status: error.statusCode || 500 }
      );
    }
  }
}
