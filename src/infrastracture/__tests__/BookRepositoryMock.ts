import { Book } from "../../domain/Book";
import { BookRepository } from "../../domain/interface/BookRepository";

const dummyBookData = [
  Book.new("ISBN1234567890111", "バイク雑誌", 2200),
  Book.new("ISBN1234567890112", "英語ペラペラになる本", 1700),
  Book.new("ISBN1234567890113", "xxx学論", 1200),
];
export class BookRepositoryMock implements BookRepository {
  private store: Map<string, Book> = new Map();

  async fetch(): Promise<void> {
    await dummyBookData.forEach((book) =>
      this.store.set(book.isbnCode(), book)
    );
  }

  async clear(): Promise<void> {
    await this.store.clear();
  }
}
