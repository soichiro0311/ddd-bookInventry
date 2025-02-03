import { Book } from "../types/api/BookApiTypes";

export class BookCardViewModel {
  title: string;
  isbnCode: string;
  private _price: number;

  constructor(apiResponse: Book) {
    this.title = apiResponse.title;
    this.isbnCode = apiResponse.isbnCode;
    this._price = apiResponse.price;
  }

  price() {
    return `${this._price.toLocaleString("ja-JP")}円`;
  }
}
