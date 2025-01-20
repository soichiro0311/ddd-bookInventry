export class BookStoreInventoryDto {
  bookStoreName: string;
  bookStoreId: string;
  isbnCode: string;
  bookTitle: string;
  inStoreInventory: number;

  constructor(
    bookStoreName: string,
    bookStoreId: string,
    isbnCode: string,
    bookTitle: string,
    inStoreInventory: number
  ) {
    this.bookStoreId = bookStoreId;
    this.bookStoreName = bookStoreName;
    this.isbnCode = isbnCode;
    this.bookTitle = bookTitle;
    this.inStoreInventory = inStoreInventory;
  }
}
