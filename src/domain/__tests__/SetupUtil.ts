import { Address } from "../Address";
import { Book } from "../Book";
import { BookInventory } from "../BookInventory";
import { BookStore } from "../BookStore";
import { Prefecture } from "../Prefecture";
import { StreetAddress } from "../StreetAddress";

export const createMockBookStore = (
  inventryIsbnCode: string,
  inStoreInventory: number,
  reservationInventory: number
) => {
  const address = new Address(
    Prefecture.KANAGAWA_KAWASKI,
    new StreetAddress(3, 4)
  );

  const inventry = [
    BookInventory.new(
      new Book(
        inventryIsbnCode,
        "世界一簡単な技術書",
        1200
      ),
      inStoreInventory,
      reservationInventory
    ),
  ];

  return BookStore.new("ヨシロー書店", address, inventry);
};
