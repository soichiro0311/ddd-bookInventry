import { Address } from "./Address";
import { BookInventory } from "./BookInventory";
import { Transaction } from "./Transaction";
import { v4 as uuidv4 } from "../../node_modules/uuid/dist/cjs";
import { Order } from "./Order";
import { OrderStatus } from "./OrderStatus";
import { AddBookStoreRequest } from "../usecase/dto/request/AddBookStoreRequest";

export class BookStore {
  private _id: string;
  private _storeName: string;
  private _address: Address;
  private _bookInventory: BookInventory[];
  private _transaction: Transaction[];
  private _order: Order[];

  constructor(
    id: string,
    storeName: string,
    address: Address,
    bookInventory: BookInventory[],
    transaction: Transaction[],
    order: Order[]
  ) {
    this._id = id;
    this._storeName = storeName;
    this._address = address;
    this._bookInventory = bookInventory;
    this._transaction = transaction;
    this._order = order;
  }

  static new(requestDto: AddBookStoreRequest) {
    const address = Address.new(
      requestDto.prefecture,
      requestDto.city,
      requestDto.streetNumber,
      requestDto.blockNumber
    );
    return new BookStore(
      uuidv4(),
      requestDto.bookStoreName,
      address,
      [],
      [],
      []
    );
  }

  static fromRepository(
    store: {
      bookInventory: {
        createdAt: Date;
        updatedAt: Date;
        isbnCode: string;
        inStoreInventory: number;
        reservationInventory: number;
        bookStoreId: string;
      }[];
      transaction: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isbnCode: string;
        bookStoreId: string;
        buyCount: number;
        buyDate: string;
      }[];
      order: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isbnCode: string;
        bookStoreId: string;
        status: number;
        orderBookCount: number;
        userId: string;
      }[];
    } & {
      id: string;
      storeName: string;
      address: string;
      createdAt: Date;
      updatedAt: Date;
    }
  ): BookStore {
    const [prefecture, city, streetNumber, blockNumber] = store.address
      .split(" ")
      .map((str) => str);

    // TODO: 集約内の他のドメインモデルの再構築
    return new BookStore(
      store.id,
      store.storeName,
      Address.new(prefecture, city, Number(streetNumber), Number(blockNumber)),
      [],
      [],
      []
    );
  }

  addInventry(bookInventory: BookInventory) {
    // TODO: bookInventryの構築もドメインモデル内に取り込む
    this._bookInventory.push(bookInventory);
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

  address(): string {
    return this._address.toString();
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
      .filter((transaction) => transaction.isbnCode() === isbnCode)
      .reduce((sumBuyCount: number, transaction: Transaction): number => {
        return sumBuyCount + transaction.buyCount();
      }, 0);

    return targetIventry.inStoreInventry() - transactionBuyCountSum > 0;
  }

  recordTransaction(transaction: Transaction) {
    this._transaction.push(transaction);
  }

  recordOrder(order: Order) {
    this._order.push(order);
  }

  orderStatus(isbnCode: string, userId: string): OrderStatus {
    const targetOrder = this._order.find(
      (order) => order.isbnCode() === isbnCode && order.userId() === userId
    );
    if (targetOrder == null) {
      // TODO: エラー処理ちゃんとする
      throw new Error("対象の取り寄せ注文が存在しません");
    }

    return targetOrder.status();
  }
}
