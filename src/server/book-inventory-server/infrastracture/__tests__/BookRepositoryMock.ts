import { Book } from "../../domain/Book";
import { BookRepository } from "../../domain/interface/BookRepository";

const dummyBookData = [
  Book.new("ISBN1234567890111", "バイク雑誌", 2200),
  Book.new("ISBN1234567890112", "英語ペラペラになる本", 1700),
  Book.new("ISBN1234567890113", "xxx学論", 1200),
];
export class BookRepositoryMock implements BookRepository {
  private store: Map<string, Book> = new Map();

  async findByTitle(title: string): Promise<Book[]> {
    return await Array.from(dummyBookData.values()).filter((book) =>
      book.title().includes(title)
    );
  }

  async findAll(): Promise<Book[]> {
    return await Array.from(dummyBookData.values());
  }

  async importCSV(): Promise<Book[]> {
    return await dummyBookData;
  }

  async add(books: Book[]): Promise<void> {
    await books.forEach((book) => this.store.set(book.isbnCode(), book));
  }

  async clear(): Promise<void> {
    await this.store.clear();
  }
}
