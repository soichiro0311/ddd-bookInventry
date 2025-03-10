import { BookStoreRepository } from "../../domain/interface/BookStoreRepository";
import { OrderStatus } from "../../domain/OrderStatus";
import { DomainError } from "../../error/DomainError";
import { myContainer } from "../../inversify.config";
import { TYPES } from "../../types";
import { OrderPlaceRequest } from "../dto/request/OrderPlaceRequest";
import { OrderBook } from "../OrderBook";
import { saveMockBookStore } from "./SetupUtil";

describe("本の販売ユースケース", () => {
  const bookStoreRepository = myContainer.get<BookStoreRepository>(
    TYPES.BookStoreRepository
  );

  describe("販売と予約の記録を加味して在庫の判定が行えること", () => {
    it("特定の書籍の店頭在庫が1冊 かつ 販売記録が1冊の場合、在庫なしと判定できること", async () => {
      // setup
      const isbnCode = "TEST";
      const bookStore = saveMockBookStore(isbnCode, 1, 1, bookStoreRepository);

      // execute
      const orderBook = new OrderBook();
      orderBook.buyBook(isbnCode, 1, "TEST_STORE", bookStore.id());

      // verify
      const updatedBookStore = await bookStoreRepository.findById(
        bookStore.id()
      );
      expect(updatedBookStore.isInStore(isbnCode)).toBeFalsy();
    });
    it("特定の書籍の店頭在庫が2冊 かつ 販売記録が1冊の場合、在庫ありと判定できること", async () => {
      // setup
      const isbnCode = "TEST";
      const bookStore = saveMockBookStore(isbnCode, 2, 1, bookStoreRepository);

      // execute
      const bookTransaction = new OrderBook();
      bookTransaction.buyBook(isbnCode, 1, "TEST_STORE", bookStore.id());

      // verify
      const updatedBookStore = await bookStoreRepository.findById(
        bookStore.id()
      );
      expect(updatedBookStore.isInStore(isbnCode)).toBeTruthy();
    });
  });
});
describe("本の取り寄せユースケース", () => {
  const bookStoreRepository = myContainer.get<BookStoreRepository>(
    TYPES.BookStoreRepository
  );

  describe("取り寄せを行えること", () => {
    it("特定の書籍の取り寄せを行う", async () => {
      // setup
      const isbnCode = "TEST";
      const bookStore = saveMockBookStore(isbnCode, 1, 1, bookStoreRepository);

      // execute
      const userId = "USER1";
      const orderBook = new OrderBook();
      const request = new OrderPlaceRequest(
        isbnCode,
        1,
        bookStore.id(),
        userId
      );
      await orderBook.placeOrder(request);

      // verify
      const updatedBookStore = await bookStoreRepository.findById(
        bookStore.id()
      );
      expect(updatedBookStore.orderStatus(isbnCode, userId)).toBe(
        OrderStatus.PLACED
      );
    });

    it("書店に取り寄せ対象の書籍が存在しない場合は、エラーが発生すること", async () => {
      // setup
      const isbnCode = "TEST";
      const bookStore = saveMockBookStore(isbnCode, 1, 1, bookStoreRepository);

      // execute
      const userId = "USER1";
      const wrongIsbnCode = "TEST2";
      const orderBook = new OrderBook();

      const request = new OrderPlaceRequest(
        wrongIsbnCode,
        1,
        bookStore.id(),
        userId
      );

      try {
        await orderBook.placeOrder(request);
        fail();
      } catch (e) {
        expect(e).toEqual(
          new DomainError(
            `対象の書籍は取り寄せ対象の書店では取り扱っていません。 ISBNコード: ${wrongIsbnCode} 書店ID: ${bookStore.id()}`
          )
        );
      }
    });
  });
});
