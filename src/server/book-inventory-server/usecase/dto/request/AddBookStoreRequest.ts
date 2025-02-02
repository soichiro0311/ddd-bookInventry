export class AddBookStoreRequest {
  bookStoreName: string;
  prefecture: string;
  city: string;
  streetNumber: number;
  blockNumber: number;

  constructor(
    bookStoreName: string,
    prefecture: string,
    city: string,
    streetNumber: number,
    blockNumber: number
  ) {
    this.bookStoreName = bookStoreName;
    this.prefecture = prefecture;
    this.city = city;
    this.streetNumber = streetNumber;
    this.blockNumber = blockNumber;
  }
}
