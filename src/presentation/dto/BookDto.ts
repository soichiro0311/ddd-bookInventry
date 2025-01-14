import { Book } from "../../domain/Book";

export class BookDto {
  title: string;
  isbnCode: string;

  constructor(title: string, isbnCode: string) {
    this.title = title;
    this.isbnCode = isbnCode;
  }

  static fromDomainModel(book: Book) {
    return new BookDto(book.title(), book.isbnCode());
  }
}
