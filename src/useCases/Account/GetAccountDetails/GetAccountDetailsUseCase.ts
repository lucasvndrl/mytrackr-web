import { IAccountRepository } from "@/repositories/IAccountRepository";
import { AccountTable } from "@/types/dbTables";

export class GetAccountDetailsUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(userId: string): Promise<AccountTable | undefined> {
    const account = await this.accountRepository.getDetails(userId);

    return account;
  }
}
