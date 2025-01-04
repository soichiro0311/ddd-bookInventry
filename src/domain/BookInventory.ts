import { Book } from "./Book";

export class BookInventory {
  private _book: Book;
  private _inStoreInventory: number;
  private _reservationInventory: number;

  constructor(
    book: Book,
    inStoreInventory: number,
    reservationInventory: number
  ) {
    this._book = book;
    this._inStoreInventory = inStoreInventory;
    this._reservationInventory = reservationInventory;
  }

  static new(
    book: Book,
    inStoreInventory: number,
    reservationInventory: number
  ) {
    return new BookInventory(
      book,
      inStoreInventory,
      reservationInventory
    );
  }

  isbnCode(): string {
    return this._book.isbnCode();
  }

  inStoreInventry(): number {
    return this._inStoreInventory;
  }
}
