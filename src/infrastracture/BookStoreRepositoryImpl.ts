import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";

export class BookStoreRepositoryImpl
  implements BookStoreRepository
{
  findById(bookStoreId: string): Promise<BookStore> {
    throw new Error("Method not implemented.");
  }

  save(bookStore: BookStore): void {
    throw new Error("Method not implemented.");
  }
}
