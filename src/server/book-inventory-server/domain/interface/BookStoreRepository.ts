import { BookInventoryRepositoryDto } from "../../server/usecase/dto/response/BookInventryRepositoryDto";
import { BookStore } from "../BookStore";

export interface BookStoreRepository {
  findAll(): Promise<BookStore[]>;
  findById(bookStoreId: string): Promise<BookStore>;
  save(bookStore: BookStore): Promise<void>;
  fetchInventory(): BookInventoryRepositoryDto[];
  upadateInventory(bookStore: BookStore): Promise<void>;
  clear(): void;
}
