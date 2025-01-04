import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";
import { AddBookStoreRequest } from "./dto/request/AddBookStoreRequest";
import { BookRepository } from "../domain/interface/BookRepository";

export class MaintenanceBookStore {
  private bookStoreRepository = myContainer.get<BookStoreRepository>(
    TYPES.BookStoreRepository
  );
  private bookRepository = myContainer.get<BookRepository>(
    TYPES.BookRepository
  );

  async addBookStore(request: AddBookStoreRequest) {
    const bookStore = BookStore.new(request);
    await this.bookStoreRepository.save(bookStore);
  }

  async allBooks() {
    return await this.bookStoreRepository.findAll();
  }

  async fetchBookInventry() {
    await this.bookStoreRepository.fetch();
  }

  async fetchBook() {
    await this.bookRepository.fetch();
  }
}
