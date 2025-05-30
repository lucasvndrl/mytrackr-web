import { AccountTable } from "@/types/dbTables";
import { IAccountRepository } from "../../../repositories/IAccountRepository";

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(account: AccountTable): Promise<void> {
    await this.accountRepository.save(account);
  }
}
