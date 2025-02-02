import { Transaction } from "../../domain/Transaction";

import { TransactionRepository } from "../../domain/interface/TransactionRepository";

export class TransactionRepositoryMock implements TransactionRepository {
  private store: Map<string, Transaction> = new Map();
  save(transaction: Transaction): void {
    this.store.set(transaction.id(), transaction);
  }

  clear(): void {
    this.store.clear();
  }
}
