import { createMockBookStore } from "../../domain/__tests__/SetupUtil";
import { BookStoreRepository } from "../../domain/BookStoreRepository";
import { myContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import { OrderBook } from "../OrderBook";
import { saveMockBookStore } from "./SetupUtil";

describe("本の販売ユースケース", () => {
  const bookStoreRepository =
    myContainer.get<BookStoreRepository>(
      TYPES.BookStoreRepository
    );

  describe("販売と予約の記録を加味して在庫の判定が行えること", () => {
    it("特定の書籍の店頭在庫が1冊 かつ 販売記録が1冊の場合、在庫なしと判定できること", async () => {
      // setup
      const isbnCode = "TEST";
      const bookStore = saveMockBookStore(
        isbnCode,
        1,
        1,
        bookStoreRepository
      );

      // execute
      const orderBook = new OrderBook();
      orderBook.buyBook(
        isbnCode,
        1,
        "TEST_STORE",
        bookStore.id()
      );

      // verify
      const updatedBookStore =
        await bookStoreRepository.findById(bookStore.id());
      expect(
        updatedBookStore.isInStore(isbnCode)
      ).toBeFalsy();
    });
    it("特定の書籍の店頭在庫が2冊 かつ 販売記録が1冊の場合、在庫ありと判定できること", async () => {
      // setup
      const isbnCode = "TEST";
      const bookStore = saveMockBookStore(
        isbnCode,
        2,
        1,
        bookStoreRepository
      );

      // execute
      const bookTransaction = new OrderBook();
      bookTransaction.buyBook(
        isbnCode,
        1,
        "TEST_STORE",
        bookStore.id()
      );

      // verify
      const updatedBookStore =
        await bookStoreRepository.findById(bookStore.id());
      expect(
        updatedBookStore.isInStore(isbnCode)
      ).toBeTruthy();
    });
  });
});
