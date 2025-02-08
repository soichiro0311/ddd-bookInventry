import { BookRepository } from "../domain/interface/BookRepository";
import { Book } from "../domain/Book";
import { PrismaClient } from "@prisma/client";
import { parseCSV } from "./shared/CSVParser";

export class BookRepositoryImpl implements BookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }

  async findByTitle(title: string): Promise<Book[]> {
    const bookData = await this.prisma.book.findMany({
      where: {
        title: { contains: title },
      },
    });
    return bookData.map((data: any) => Book.fromRepository(data));
  }

  async findAll(): Promise<Book[]> {
    const bookData = await this.prisma.book.findMany();
    return bookData.map((data: any) => Book.fromRepository(data));
  }

  clear(): void {
    throw new Error("Method not implemented.");
  }

  async add(books: Book[]): Promise<void> {
    const dto = books.map((domain) => {
      return {
        isbnCode: domain.isbnCode(),
        title: domain.title(),
        price: domain.price(),
      };
    });

    await this.prisma.book.createMany({
      data: dto,
    });
  }

  async importCSV(): Promise<Book[]> {
    const records = parseCSV("book.csv");

    return records.map((record) => {
      const isbnCode = record[0];
      const title = record[1];
      const price = Number(record[2]);

      return Book.new(isbnCode, title, price);
    });
  }
}
