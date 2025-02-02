import { Transaction } from "../domain/Transaction";

import { TransactionRepository } from "../domain/interface/TransactionRepository";

export class TransactionRepositoryImpl implements TransactionRepository {
  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  save(transaction: Transaction): void {
    throw new Error("Method not implemented.");
  }
}
