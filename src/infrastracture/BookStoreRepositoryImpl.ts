import { PrismaClient } from "@prisma/client";
import { BookStore } from "../domain/BookStore";
import { BookStoreRepository } from "../domain/interface/BookStoreRepository";
import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { BookInventory } from "../domain/BookInventory";
import { Book } from "../domain/Book";

export class BookStoreRepositoryImpl implements BookStoreRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }

  async findAll(): Promise<BookStore[]> {
    const allStores = await this.prisma.bookStore.findMany({
      include: {
        order: true,
        transaction: true,
        bookInventory: true,
      },
    });
    return allStores.map((store) => BookStore.fromRepository(store));
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

  async fetch(): Promise<void> {
    const data = fs.readFileSync("bookInventory.csv");
    const records: Array<any> = parse(data, {
      //  BOM付きの場合はtrueにする
      bom: true,
      // ヘッダを無視したいので、2行目から読み込む
      from: 2,
    });

    records.forEach(async (record) => {
      const bookStoreId = record[0];
      const isbnCode = record[1];
      const inStoreInventory = Number(record[2]);
      const reservationInventory = Number(record[3]);

      const bookData = await this.prisma.book.findUniqueOrThrow({
        where: {
          isbnCode: isbnCode,
        },
      });

      const book = Book.fromRepository(bookData);
      const inventory = BookInventory.new(
        book.isbnCode(),
        inStoreInventory,
        reservationInventory
      );

      const bookStoreData = await this.prisma.bookStore.findUniqueOrThrow({
        where: {
          id: bookStoreId,
        },
        include: {
          order: true,
          transaction: true,
          bookInventory: true,
        },
      });
      const bookStore = BookStore.fromRepository(bookStoreData);
      bookStore.addInventry(inventory);

      await this.prisma.bookStore.update({
        data: {
          bookInventory: {
            create: {
              isbnCode: isbnCode,
              inStoreInventory: inStoreInventory,
              reservationInventory: reservationInventory,
            },
          },
        },
        where: { id: bookStore.id() },
      });
    });
  }
}
