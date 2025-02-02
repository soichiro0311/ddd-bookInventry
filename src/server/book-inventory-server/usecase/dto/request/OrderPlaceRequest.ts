export class OrderPlaceRequest {
  isbnCode: string;
  orderBookCount: number;
  bookStoreId: string;
  userId: string;
  constructor(
    isbnCode: string,
    orderBookCount: number,
    bookStoreId: string,
    userId: string
  ) {
    this.isbnCode = isbnCode;
    this.orderBookCount = orderBookCount;
    this.bookStoreId = bookStoreId;
    this.userId = userId;
  }
}
