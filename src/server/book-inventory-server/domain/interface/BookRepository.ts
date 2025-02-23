import { Book } from "../Book";

export interface BookRepository {
  add(books: Book[]): Promise<void>;
  findAll(): Promise<Book[]>;
  findByTitle(title: string): Promise<Book[]>;
  findByIsBnCode(isbnCode: string): Promise<Book>;
  importCSV(): Promise<Book[]>;
  clear(): void;
}
