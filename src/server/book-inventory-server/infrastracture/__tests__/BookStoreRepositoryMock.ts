import { BookStore } from "../../domain/BookStore";
import { BookStoreRepository } from "../../domain/interface/BookStoreRepository";
import { BookInventoryRepositoryDto } from "../../usecase/dto/response/BookInventryRepositoryDto";

export const dummyInventoryCSVDto: BookInventoryRepositoryDto[] = [];

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

  async upadateInventory(bookStore: BookStore): Promise<void> {
    this.store.set(bookStore.id(), bookStore);
  }

  fetchInventory(): BookInventoryRepositoryDto[] {
    return dummyInventoryCSVDto;
  }

  clear(): void {
    this.store.clear();
  }
}
