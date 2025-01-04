import { BookStore } from "../../domain/BookStore";

export class BookStoreDto {
  id: string;
  bookStoreName: string;
  address: string;

  constructor(id: string, bookStoreName: string, address: string) {
    this.id = id;
    this.bookStoreName = bookStoreName;
    this.address = address;
  }

  static fromDomainModel(bookStore: BookStore) {
    return new BookStoreDto(
      bookStore.id(),
      bookStore.name(),
      bookStore.address()
    );
  }
}
