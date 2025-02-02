export class Book {
  private _title: string;
  private _isbnCode: string;
  private _price: number;
  constructor(isbnCode: string, title: string, price: number) {
    this._isbnCode = isbnCode;
    this._title = title;
    this._price = price;
  }

  static fromRepository(data: {
    createdAt: Date;
    updatedAt: Date;
    isbnCode: string;
    title: string;
    price: number;
  }) {
    return new Book(data.isbnCode, data.title, data.price);
  }

  static new(isbnCode: string, title: string, price: number) {
    return new Book(isbnCode, title, price);
  }

  isbnCode(): string {
    return this._isbnCode;
  }
  price(): number {
    return this._price;
  }
  title(): string {
    return this._title;
  }
}
