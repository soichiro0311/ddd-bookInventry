import { BookInventory } from "./BookInventory";

export class BookStore {
  private _storeName: string;
  private _address: string;
  private _bookInventory: BookInventory;

  constructor(
    storeName: string,
    address: string,
    bookInventory: BookInventory
  ) {
    this._storeName = storeName;
    this._address = address;
    this._bookInventory = bookInventory;
  }

  isInStore(): boolean {
    return this._bookInventory.isInStore();
  }
}
