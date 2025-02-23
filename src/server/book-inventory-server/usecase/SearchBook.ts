import { BookRepository } from "../domain/interface/BookRepository";
import { myContainer } from "../inversify.config";

import { TYPES } from "../types";

export class SearchBook {
  private bookRepository = myContainer.get<BookRepository>(
    TYPES.BookRepository
  );

  async searchByTitle(title: string) {
    return await this.bookRepository.findByTitle(title);
  }

  async searchByIsbnCode(isbnCode: string) {
    return await this.bookRepository.findByIsBnCode(isbnCode);
  }
}
