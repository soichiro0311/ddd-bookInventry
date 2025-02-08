import { Book } from "../Book";

export interface BookRepository {
  add(books: Book[]): Promise<void>;
  findAll(): Promise<Book[]>;
  findByTitle(title: string): Promise<Book[]>;
  importCSV(): Promise<Book[]>;
  clear(): void;
}
