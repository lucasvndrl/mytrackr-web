import { AccountTable } from "@/types/dbTables";
import { UpdateAccountDTO } from "@/useCases/Account/UpdateAccount/UpdateAccountDTO";

export interface IAccountRepository {
  save(account: AccountTable): Promise<void>;
  getDetails(accountId: string): Promise<AccountTable>;
  updateDetails(account: UpdateAccountDTO): Promise<boolean>;
  delete(accountId: string): Promise<void>;
}
