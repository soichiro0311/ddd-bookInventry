import { BookRepository } from "../domain/interface/BookRepository";
import * as fs from "fs";
import { parse } from "csv-parse/sync";
import { Book } from "../domain/Book";
import { PrismaClient } from "@prisma/client";

export class BookRepositoryImpl implements BookRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
  }
  async fetch(): Promise<void> {
    const data = fs.readFileSync("book.csv");
    const records: Array<any> = parse(data, {
      //  BOM付きの場合はtrueにする
      bom: true,
      // ヘッダを無視したいので、2行目から読み込む
      from: 2,
    });

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
