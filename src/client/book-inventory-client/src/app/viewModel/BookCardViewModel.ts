import { Book } from "../types/api/BookApiTypes";

export class BookCardViewModel {
  title: string;
  isbnCode: string;
  private _price: number;

  constructor(title: string, isbnCode: string, price: number) {
    this.title = title;
    this.isbnCode = isbnCode;
    this._price = price;
  }

  static fromApiResponse(apiResponse: Book) {
    return new BookCardViewModel(
      apiResponse.title,
      apiResponse.isbnCode,
      apiResponse.price
    );
  }

  price() {
    return `${this._price.toLocaleString("ja-JP")}円`;
  }
}
