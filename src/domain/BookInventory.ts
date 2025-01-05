import { Book } from "./Book";

export class BookInventory {
  private _isbnCode: string;
  private _inStoreInventory: number;
  private _reservationInventory: number;

  constructor(
    isbnCode: string,
    inStoreInventory: number,
    reservationInventory: number
  ) {
    this._isbnCode = isbnCode;
    this._inStoreInventory = inStoreInventory;
    this._reservationInventory = reservationInventory;
  }

  static new(
    isbnCode: string,
    inStoreInventory: number,
    reservationInventory: number
  ): BookInventory {
    return new BookInventory(isbnCode, inStoreInventory, reservationInventory);
  }

  static fromRepository(
    isbnCode: string,
    inStoreInventory: number,
    reservationInventory: number
  ): BookInventory {
    return new BookInventory(isbnCode, inStoreInventory, reservationInventory);
  }

  isbnCode(): string {
    return this._isbnCode;
  }

  inStoreInventory(): number {
    return this._inStoreInventory;
  }

  reservationInventory(): number {
    return this._reservationInventory;
  }
}
