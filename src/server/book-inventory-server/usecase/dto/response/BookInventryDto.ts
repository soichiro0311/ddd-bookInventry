export class BookInventoryDto {
  bookStoreId: string;
  bookStorename: string;
  booktitle: string;
  isbnCode: string;
  inStoreInventry: number;
  reservationInventry: number;

  constructor(
    bookStoreId: string,
    bookStorename: string,
    bookTitle: string,
    isbnCode: string,
    inStoreInventry: number,
    reservationInventry: number
  ) {
    this.bookStoreId = bookStoreId;
    this.bookStorename = bookStorename;
    this.booktitle = bookTitle;
    this.isbnCode = isbnCode;
    this.inStoreInventry = inStoreInventry;
    this.reservationInventry = reservationInventry;
  }
}

export class isInStoreBookDto {
  bookStoreId: string;
  bookStorename: string;
  isbnCode: string;
  isInStore: boolean;

  constructor(
    bookStoreId: string,
    bookStorename: string,
    isbnCode: string,
    isInStore: boolean
  ) {
    this.bookStoreId = bookStoreId;
    this.bookStorename = bookStorename;
    this.isbnCode = isbnCode;
    this.isInStore = isInStore;
  }
}
