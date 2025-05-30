import { AccountRepository } from "../../../repositories/AccountRepository";
import { DeleteAccountController } from "./DeleteAccountController";
import { DeleteAccountUseCase } from "./DeleteAccountUseCase";

const accountRepository = new AccountRepository();

const deleteAccountUseCase = new DeleteAccountUseCase(accountRepository);

const deleteAccountController = new DeleteAccountController(
  deleteAccountUseCase
);

export { deleteAccountController };
