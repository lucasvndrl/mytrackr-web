import { IAccountRepository } from "../../../repositories/IAccountRepository";

export class DeleteAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<void> {
    return await this.accountRepository.delete(accountId);
  }
}
