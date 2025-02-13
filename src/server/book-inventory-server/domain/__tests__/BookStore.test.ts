import { createMockBookStore } from "./SetupUtil";

describe("在庫の確認", () => {
  describe("在庫の存在確認", () => {
    it("特定の書籍の店頭在庫が1冊の場合、在庫ありと判定できること", () => {
      const bookStore = createMockBookStore("TEST", 1, 0);
      expect(bookStore.isInStore("TEST")).toBeTruthy();
    });
    it("特定の書籍の店頭在庫が0冊, 予約在庫が0冊の場合、在庫なしと判定できること", () => {
      const bookStore = createMockBookStore("TEST", 0, 0);
      expect(bookStore.isInStore("TEST")).toBeFalsy();
    });
    it("特定の書籍の店頭在庫が0冊, 予約在庫が1冊の場合、在庫なしと判定できること", () => {
      const bookStore = createMockBookStore("TEST", 0, 1);
      expect(bookStore.isInStore("TEST")).toBeFalsy();
    });
  });
});
