import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { Order } from "../domain/Order";
import { Transaction } from "../domain/Transaction";
import { TransactionRepository } from "../domain/interface/TransactionRepository";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";
import { OrderRepository } from "../domain/interface/OrderRepository";
import { AddBookStoreRequest } from "./dto/request/AddBookStoreRequest";

export class MaintenanceBookStore {
  private bookStoreRepository = myContainer.get<BookStoreRepository>(
    TYPES.BookStoreRepository
  );

  async addBookStore(request: AddBookStoreRequest) {
    const bookStore = BookStore.new(request);
    await this.bookStoreRepository.save(bookStore);
  }
}
