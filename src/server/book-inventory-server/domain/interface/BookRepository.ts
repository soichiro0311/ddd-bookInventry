import { Book } from "../Book";

export interface BookRepository {
  findByTitle(title: string): Promise<Book[]>;
  fetch(): Promise<void>;
  clear(): void;
}
