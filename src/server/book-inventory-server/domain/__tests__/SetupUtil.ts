import { AddBookStoreRequest } from "../../usecase/dto/request/AddBookStoreRequest";

import { Book } from "../Book";
import { BookInventory } from "../BookInventory";
import { BookStore } from "../BookStore";

export const createMockBookStore = (
  inventryIsbnCode: string,
  inStoreInventory: number,
  reservationInventory: number
) => {
  const request = new AddBookStoreRequest(
    "ヨシロー書店",
    "Kanagawa",
    "Kawasaki",
    3,
    4
  );

  const store = BookStore.new(request);
  store.addInventry(
    BookInventory.new(
      new Book(inventryIsbnCode, "世界一簡単な技術書", 1200).isbnCode(),
      inStoreInventory,
      reservationInventory
    )
  );
  return store;
};
