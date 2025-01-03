import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/BookStoreRepository";
import { Transaction } from "../domain/Transaction";
import { TransactionRepository } from "../domain/TransactionRepository";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";

export class OrderBook {
  private bookStoreRepository =
    myContainer.get<BookStoreRepository>(
      TYPES.BookStoreRepository
    );
  private transactionRepository =
    myContainer.get<TransactionRepository>(
      TYPES.TransactionRepository
    );

  async buyBook(
    isbnCode: string,
    buyBookCount: number,
    buyDate: string,
    bookStoreId: string
  ) {
    const transaction = Transaction.new(
      isbnCode,
      buyBookCount,
      buyDate
    );
    this.transactionRepository.save(transaction);
    const bookStore =
      await this.bookStoreRepository.findById(bookStoreId);
    bookStore.recordTransaction(transaction);
    this.bookStoreRepository.save(bookStore);
  }
}
