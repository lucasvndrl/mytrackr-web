import { AccountRepository } from "../../../repositories/AccountRepository";
import { UpdateAccountController } from "./UpdateAccountController";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

const accountRepository = new AccountRepository();

const updateAccountUseCase = new UpdateAccountUseCase(accountRepository);

const updateAccountController = new UpdateAccountController(
  updateAccountUseCase
);

export { updateAccountController };
