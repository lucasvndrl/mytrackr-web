import { AccountRepository } from "@/repositories/AccountRepository";
import { GetAccountDetailsUseCase } from "./GetAccountDetailsUseCase";
import { GetAccountDetailsController } from "./GetAccountDetailsController";

const accountRepository = new AccountRepository();

const getAccountDetailsUseCase = new GetAccountDetailsUseCase(
  accountRepository
);

const getAccountDetailsController = new GetAccountDetailsController(
  getAccountDetailsUseCase
);

export { getAccountDetailsController };
