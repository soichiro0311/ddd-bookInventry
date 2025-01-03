import { Address } from "./Address";
import { BookInventory } from "./BookInventory";
import { Transaction } from "./Transaction";
import { v4 as uuidv4 } from "../../node_modules/uuid/dist/cjs";

export class BookStore {
  private _id: string;
  private _storeName: string;
  private _address: Address;
  private _bookInventory: BookInventory[];
  private _transaction: Transaction[];

  constructor(
    id: string,
    storeName: string,
    address: Address,
    bookInventory: BookInventory[],
    transaction: Transaction[]
  ) {
    this._id = id;
    this._storeName = storeName;
    this._address = address;
    this._bookInventory = bookInventory;
    this._transaction = transaction;
  }

  static new(
    storeName: string,
    address: Address,
    bookInventory: BookInventory[]
  ) {
    return new BookStore(
      uuidv4(),
      storeName,
      address,
      bookInventory,
      []
    );
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._storeName;
  }
  inventry() {
    return this._bookInventory;
  }

  isInStore(isbnCode: string): boolean {
    const targetIventry = this._bookInventory.find(
      (inventry) => inventry.isbnCode() === isbnCode
    );
    if (targetIventry == null) {
      // TODO: エラー処理
      throw new Error("対象の書籍の在庫が存在しません");
    }

    const transactionBuyCountSum = this._transaction
      .filter(
        (transaction) => transaction.isbnCode() === isbnCode
      )
      .reduce(
        (
          sumBuyCount: number,
          transaction: Transaction
        ): number => {
          // accは「初期値 or 前回のreturn値」でvalは「配列要素」
          return sumBuyCount + transaction.buyCount();
        },
        0
      );

    return (
      targetIventry.inStoreInventry() -
        transactionBuyCountSum >
      0
    );
  }

  recordTransaction(transaction: Transaction) {
    this._transaction.push(transaction);
  }
}
