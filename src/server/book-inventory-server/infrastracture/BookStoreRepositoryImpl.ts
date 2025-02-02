import { PrismaClient } from "@prisma/client";
import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import { parseCSV } from "./shared/CSVParser";
import { BookInventoryRepositoryDto } from "../usecase/dto/response/BookInventryRepositoryDto";

export class BookStoreRepositoryImpl implements BookStoreRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }

  clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<BookStore[]> {
    const allStores = await this.prisma.bookStore.findMany({
      include: {
        order: true,
        transaction: true,
        bookInventory: true,
      },
    });
    return allStores.map((store: any) => BookStore.fromRepository(store));
  }

  async findById(bookStoreId: string): Promise<BookStore> {
    const data = await this.prisma.bookStore.findUniqueOrThrow({
      where: {
        id: bookStoreId,
      },
      include: {
        order: true,
        transaction: true,
        bookInventory: true,
      },
    });

    return BookStore.fromRepository(data);
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

  async upadateInventory(bookStore: BookStore): Promise<void> {
    bookStore.inventory().forEach(async (inventory) => {
      await this.prisma.bookStore.update({
        data: {
          bookInventory: {
            create: {
              isbnCode: inventory.isbnCode(),
              inStoreInventory: inventory.inStoreInventory(),
              reservationInventory: inventory.reservationInventory(),
            },
          },
        },
        where: { id: bookStore.id() },
      });
    });
  }

  async upadateOrder(bookStore: BookStore): Promise<void> {
    bookStore.order().forEach(async (order) => {
      await this.prisma.bookStore.update({
        data: {
          order: {
            create: {
              isbnCode: order.isbnCode(),
              orderBookCount: order.orderBookCount(),
              status: order.status(),
              id: order.id(),
              userId: order.userId(),
            },
          },
        },
        where: { id: bookStore.id() },
      });
    });
  }

  fetchInventory(): BookInventoryRepositoryDto[] {
    const records = parseCSV("bookInventory.csv");

    return records.map((record) => {
      const bookStoreId = record[0];
      const isbnCode = record[1];
      const inStoreInventory = Number(record[2]);
      const reservationInventory = Number(record[3]);

      return new BookInventoryRepositoryDto(
        bookStoreId,
        isbnCode,
        inStoreInventory,
        reservationInventory
      );
    });
  }
}
