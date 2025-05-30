import { CreateAccountDTO } from "./CreateAccountDTO";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}
  async handle(createAccountDTO: CreateAccountDTO, response: Response) {
    const { account } = createAccountDTO;

    try {
      await this.createAccountUseCase.execute({
        user_id: account.user_id,
        username: account.username,
        email: account.email,
        created_at: new Date(),
        last_login: new Date(),
        favorite_genres: account.favorite_genres,
        avatar: account.avatar,
      });
      return Response.json({ message: "Account created" }, { status: 201 });
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
