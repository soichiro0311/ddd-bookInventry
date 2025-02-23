import { Book, BookInventory, BookStore, Prisma } from "@prisma/client";

export class BookStoreInventoryDto {
  bookInfo: BookInfo;
  inventoryInfo: InventoryInfo[];

  constructor(
    bookInfo: Book,
    inventoryInfo: (BookInventory & { bookStore: Partial<BookStore> })[]
  ) {
    this.bookInfo = new BookInfo(bookInfo);
    this.inventoryInfo = inventoryInfo.map(
      (inventory) => new InventoryInfo(inventory)
    );
  }
}

class BookInfo {
  title: string;
  price: number;
  isbnCode: string;

  constructor(bookInfo: BookInfo) {
    this.title = bookInfo.title;
    this.price = bookInfo.price;
    this.isbnCode = bookInfo.isbnCode;
  }
}

class InventoryInfo {
  bookStoreId: string;
  bookStoreName: string;
  address: string;
  inStoreInventory: number;

  constructor(
    inventoryInfo: BookInventory & { bookStore: Partial<BookStore> }
  ) {
    this.bookStoreId = inventoryInfo.bookStoreId;
    this.bookStoreName = inventoryInfo.bookStore.storeName!;
    this.address = inventoryInfo.bookStore.address!;
    this.inStoreInventory = inventoryInfo.inStoreInventory;
  }
}
