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

  isInStore(): boolean {
    return this._inStoreInventory > 0;
  }
}
