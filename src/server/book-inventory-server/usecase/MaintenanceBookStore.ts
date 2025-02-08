import { BookInventory } from "../domain/BookInventory";
import { BookStore } from "../domain/BookStore";
import { BookRepository } from "../domain/interface/BookRepository";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { myContainer } from "../inversify.config";

import { TYPES } from "../types";
import { AddBookStoreRequest } from "./dto/request/AddBookStoreRequest";

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
    this.bookStoreRepository.fetchInventory().forEach(async (inventory) => {
      const bookStore = await this.bookStoreRepository.findById(
        inventory.bookStoreId
      );
      bookStore.addInventry(
        BookInventory.fromRepository(
          inventory.isbnCode,
          inventory.inStoreInventory,
          inventory.reservationInventory
        )
      );
      await this.bookStoreRepository.upadateInventory(bookStore);
    });
  }

  async fetchBook() {
    const registeredBooks = await this.bookRepository.findAll();
    const importBooks = await this.bookRepository.importCSV();
    const shouldRegisterBooks = importBooks.filter(
      (imported) =>
        registeredBooks.find(
          (registered) => registered.isbnCode() === imported.isbnCode()
        ) == null
    );
    await this.bookRepository.add(shouldRegisterBooks);
  }
}
