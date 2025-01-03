export class Book {
  private _title: string;
  private _isbnCode: string;
  private _price: number;
  constructor(
    isbnCode: string,
    title: string,
    price: number
  ) {
    this._isbnCode = isbnCode;
    this._title = title;
    this._price = price;
  }

  isbnCode(): string {
    return this._isbnCode;
  }
}
