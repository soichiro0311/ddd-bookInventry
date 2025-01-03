import { Book } from "../Book";
import { BookInventory } from "../BookInventory";
import { BookStore } from "../BookStore";

export const createMockBookStore = (
  inStoreInventory: number,
  reservationInventory: number
) => {
  return new BookStore(
    "ヨシロー書店",
    "xxx県yyy市zzz町",
    new BookInventory(
      new Book("TEST", "世界一簡単な技術書", 1200),
      inStoreInventory,
      reservationInventory
    )
  );
};
