import { Transaction } from "../domain/Transaction";

import { TransactionRepository } from "../domain/interface/TransactionRepository";

export class TransactionRepositoryImpl
  implements TransactionRepository
{
  save(transaction: Transaction): void {
    throw new Error("Method not implemented.");
  }
}
