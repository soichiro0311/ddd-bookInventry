import { BookStore } from "../BookStore";

export interface BookStoreRepository {
  findById(bookStoreId: string): Promise<BookStore>;
  save(bookStore: BookStore): Promise<void>;
}
