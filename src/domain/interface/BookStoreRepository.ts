import { BookStore } from "../BookStore";

export interface BookStoreRepository {
  findAll(): Promise<BookStore[]>;
  findById(bookStoreId: string): Promise<BookStore>;
  save(bookStore: BookStore): Promise<void>;
}
