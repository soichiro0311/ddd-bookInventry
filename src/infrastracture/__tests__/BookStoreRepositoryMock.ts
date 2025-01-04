import { BookStore } from "../../domain/BookStore";
import { BookStoreRepository } from "../../domain/interface/BookStoreRepository";

export class BookStoreRepositoryMock implements BookStoreRepository {
  private store: Map<string, BookStore> = new Map();

  async findAll(): Promise<BookStore[]> {
    return await Array.from(this.store.values());
  }

  findById(bookStoreId: string): Promise<BookStore> {
    const target = this.store.get(bookStoreId);
    if (target == null) {
      throw new Error("IllegalStatemet!");
    }
    return new Promise((resolve, reject) => {
      return resolve(target);
    });
  }

  async save(bookStore: BookStore): Promise<void> {
    await this.store.set(bookStore.id(), bookStore);
  }
}
