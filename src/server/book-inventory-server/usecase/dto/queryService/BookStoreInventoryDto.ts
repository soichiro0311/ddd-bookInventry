export class BookStoreInventoryDto {
  bookStoreName: string;
  bookStoreId: string;
  isbnCode: string;
  bookTitle: string;
  price: number;
  inStoreInventory: number;

  constructor(
    bookStoreName: string,
    bookStoreId: string,
    isbnCode: string,
    bookTitle: string,
    price: number,
    inStoreInventory: number
  ) {
    this.bookStoreId = bookStoreId;
    this.bookStoreName = bookStoreName;
    this.isbnCode = isbnCode;
    this.bookTitle = bookTitle;
    this.price = price;
    this.inStoreInventory = inStoreInventory;
  }
}
