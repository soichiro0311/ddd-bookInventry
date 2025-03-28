import { Transaction } from "../Transaction";

export interface TransactionRepository {
  save(transaction: Transaction): void;
  clear(): void;
}
