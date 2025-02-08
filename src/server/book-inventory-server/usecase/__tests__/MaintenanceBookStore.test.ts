import { Book } from "../../domain/Book";
import { BookRepository } from "../../domain/interface/BookRepository";
import { myContainer } from "../../inversify.config";
import { TYPES } from "../../types";

import { MaintenanceBookStore } from "../MaintenanceBookStore";

describe("本の登録ユースケース", () => {
  const bookRepository = myContainer.get<BookRepository>(TYPES.BookRepository);

  describe("本の登録用CSVから本を登録できること", () => {
    it("すでに登録済みの本は登録対象にならないこと", async () => {
      // setup
      const isbnCode = "ISBN1234567890111";
      const registeredbook = Book.new(isbnCode, "バイク雑誌", 2200);
      bookRepository.add([registeredbook]);

      // execute
      const maintenanceBookStore = new MaintenanceBookStore();
      maintenanceBookStore.fetchBook();

      // verify
      const books = await bookRepository.findAll();
      expect(books.length).toBe(3);
      expect(books[0].isbnCode()).toBe("ISBN1234567890111");
      expect(books[1].isbnCode()).toBe("ISBN1234567890112");
      expect(books[2].isbnCode()).toBe("ISBN1234567890113");
    });
  });
});
