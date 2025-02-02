import { BookInventory } from "../../domain/BookInventory";
import { BookStore } from "../../domain/BookStore";

export class BookStoreDto {
  id: string;
  bookStoreName: string;
  address: string;
  bookInventory: BookInventoryDto[];

  constructor(
    id: string,
    bookStoreName: string,
    address: string,
    bookInventory: BookInventoryDto[]
  ) {
    this.id = id;
    this.bookStoreName = bookStoreName;
    this.address = address;
    this.bookInventory = bookInventory;
  }

  static fromDomainModel(bookStore: BookStore) {
    return new BookStoreDto(
      bookStore.id(),
      bookStore.name(),
      bookStore.address(),
      bookStore
        .inventory()
        .map((domain) => BookInventoryDto.fromDomainModel(domain))
    );
  }
}

class BookInventoryDto {
  isbnCode: string;
  inStoreInventory: number;
  reservationInventory: number;

  constructor(
    isbnCode: string,
    inStoreInventory: number,
    reservationInventory: number
  ) {
    this.isbnCode = isbnCode;
    this.inStoreInventory = inStoreInventory;
    this.reservationInventory = reservationInventory;
  }

  static fromDomainModel(bookInventory: BookInventory) {
    return new BookInventoryDto(
      bookInventory.isbnCode(),
      bookInventory.inStoreInventory(),
      bookInventory.reservationInventory()
    );
  }
}
