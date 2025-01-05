import { BookRepository } from "../domain/interface/BookRepository";
import { Book } from "../domain/Book";
import { PrismaClient } from "@prisma/client";
import { parseCSV } from "./shared/CSVParser";

export class BookRepositoryImpl implements BookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }

  clear(): void {
    throw new Error("Method not implemented.");
  }

  async fetch(): Promise<void> {
    const records = parseCSV("book.csv");

    records.forEach(async (record) => {
      const isbnCode = record[0];
      const title = record[1];
      const price = Number(record[2]);

      const book = Book.new(isbnCode, title, price);
      await this.prisma.book.create({
        data: {
          isbnCode: book.isbnCode(),
          title: book.title(),
          price: book.price(),
        },
      });
    });
  }
}
