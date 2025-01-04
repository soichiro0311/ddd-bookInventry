import { Book } from "../../domain/Book";
import { BookRepository } from "../../domain/interface/BookRepository";

export class BookRepositoryMock implements BookRepository {
  private store: Map<string, Book> = new Map();

  fetch(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
