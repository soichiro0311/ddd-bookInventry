import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/BookStoreRepository";
import { Transaction } from "../domain/Transaction";
import { TransactionRepository } from "../domain/TransactionRepository";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";
import {
  BookInventoryDto,
  isInStoreBookDto,
} from "./dto/BookInventryDto";

export class BookInventry {
  private bookStoreRepository =
    myContainer.get<BookStoreRepository>(
      TYPES.BookStoreRepository
    );
  private transactionRepository =
    myContainer.get<TransactionRepository>(
      TYPES.TransactionRepository
    );

  async isInStore(isbnCode: string, bookStoreId: string) {
    const bookStore =
      await this.bookStoreRepository.findById(bookStoreId);

    return new isInStoreBookDto(
      bookStore.id(),
      bookStore.name(),
      isbnCode,
      bookStore.isInStore(isbnCode)
    );
  }
}
