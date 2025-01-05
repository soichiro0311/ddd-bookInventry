export class BookInventoryRepositoryDto {
  bookStoreId: string;
  isbnCode: string;
  inStoreInventory: number;
  reservationInventory: number;

  constructor(
    bookStoreId: string,
    isbnCode: string,
    inStoreInventry: number,
    reservationInventry: number
  ) {
    this.bookStoreId = bookStoreId;
    this.isbnCode = isbnCode;
    this.inStoreInventory = inStoreInventry;
    this.reservationInventory = reservationInventry;
  }
}
