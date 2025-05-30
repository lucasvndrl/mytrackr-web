import { IAccountRepository } from "@/repositories/IAccountRepository";
import { UpdateAccountDTO } from "./UpdateAccountDTO";

export class UpdateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(account: UpdateAccountDTO): Promise<boolean> {
    return await this.accountRepository.updateDetails(account);
  }
}
