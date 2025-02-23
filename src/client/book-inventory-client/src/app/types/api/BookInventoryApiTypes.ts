import { Book } from "./BookApiTypes";

export type BookInventory = {
  bookInfo: Book;
  inventoryInfo: InventoryInfo[];
};

export type InventoryInfo = {
  bookStoreId: string;
  bookStoreName: string;
  address: string;
  inStoreInventory: number;
};
