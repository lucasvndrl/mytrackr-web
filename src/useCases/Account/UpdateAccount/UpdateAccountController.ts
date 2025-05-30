import { UpdateAccountDTO } from "./UpdateAccountDTO";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

export class UpdateAccountController {
  constructor(private updateAccountUseCase: UpdateAccountUseCase) {}

  async handle(
    updateDTO: UpdateAccountDTO,
    response: Response
  ): Promise<Response> {
    try {
      // const body = await request.json();
      // const account = body as UpdateAccountDTO;
      await this.updateAccountUseCase.execute(updateDTO);

      return Response.json({ message: "Account updated" }, { status: 200 });
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
