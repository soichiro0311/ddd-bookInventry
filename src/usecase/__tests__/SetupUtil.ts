import { createMockBookStore } from "../../domain/__tests__/SetupUtil";
import { BookStoreRepository } from "../../domain/interface/BookStoreRepository";

export const saveMockBookStore = (
  inventryIsbnCode: string,
  inStoreInventory: number,
  reservationInventory: number,
  repository: BookStoreRepository
) => {
  const bookStore = createMockBookStore(
    inventryIsbnCode,
    inStoreInventory,
    reservationInventory
  );
  repository.save(bookStore);

  return bookStore;
};
