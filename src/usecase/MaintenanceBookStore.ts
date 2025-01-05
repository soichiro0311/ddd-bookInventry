import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";
import { AddBookStoreRequest } from "./dto/request/AddBookStoreRequest";
import { BookRepository } from "../domain/interface/BookRepository";
import { BookInventory } from "../domain/BookInventory";

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
    await this.bookRepository.fetch();
  }
}
