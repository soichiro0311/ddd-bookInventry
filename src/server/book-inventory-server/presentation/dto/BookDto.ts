import { Book } from "../../domain/Book";

export class BookDto {
  title: string;
  price: number;
  isbnCode: string;

  constructor(title: string, price: number, isbnCode: string) {
    this.title = title;
    this.price = price;
    this.isbnCode = isbnCode;
  }

  static fromDomainModel(book: Book) {
    return new BookDto(book.title(), book.price(), book.isbnCode());
  }
}
