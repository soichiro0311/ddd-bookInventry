import { PrismaClient } from "@prisma/client";
import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";

export class BookStoreRepositoryImpl implements BookStoreRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }
  findById(bookStoreId: string): Promise<BookStore> {
    throw new Error("Method not implemented.");
  }

  async save(bookStore: BookStore): Promise<void> {
    await this.prisma.bookStore.create({
      data: {
        id: bookStore.id(),
        storeName: bookStore.name(),
        address: bookStore.address(),
      },
    });
  }
}
