import { DomainError } from "../../error/DomainError";
import { Address } from "../Address";

describe("住所の作成", () => {
  describe("バリデーション", () => {
    it("マスタ登録済みの県と市の組み合わせの場合に、住所を生成できる", () => {
      const address = Address.new("Tokyo", "Chuou", 4, 5);
      expect(address.toString()).toBe("Tokyo Chuou 4 5");
    });
    it("マスタ登録済みの県でない場合に、DomainErrorが発生し、住所を生成できない", () => {
      expect(() => Address.new("America", "Kawasaki", 4, 5)).toThrow(
        new DomainError(
          "マスタ登録されていない県の書店を登録しています。 登録対象 県:America 市:Kawasaki"
        )
      );
    });
    it("マスタ登録済みの市でない場合に、DomainErrorが発生し、住所を生成できない", () => {
      expect(() => Address.new("Tokyo", "NewYork", 4, 5)).toThrow(
        new DomainError(
          "マスタ登録されていない県の書店を登録しています。 登録対象 県:Tokyo 市:NewYork"
        )
      );
    });
    it("マスタ登録済みの県と市の組み合わせでない場合に、DomainErrorが発生し、住所を生成できない", () => {
      expect(() => Address.new("Tokyo", "Kawasaki", 4, 5)).toThrow(
        new DomainError(
          "マスタ登録されていない県の書店を登録しています。 登録対象 県:Tokyo 市:Kawasaki"
        )
      );
    });
  });
});
