import { OrderStatus } from "./OrderStatus";
import { v4 as uuidv4 } from "../../node_modules/uuid/dist/cjs";

export class Order {
  private _id: string;
  private _isbnCode: string;
  private _status: OrderStatus;
  private _orderBookCount: number;
  private _userId: string;

  constructor(
    id: string,
    isbnCode: string,
    status: OrderStatus,
    orderBookCount: number,
    userId: string
  ) {
    this._id = id;
    this._isbnCode = isbnCode;
    this._status = status;
    this._orderBookCount = orderBookCount;
    this._userId = userId;
  }

  static new(isbnCode: string, orderBookCount: number, userId: string) {
    return new Order(
      uuidv4(),
      isbnCode,
      OrderStatus.PLACED,
      orderBookCount,
      userId
    );
  }

  id(): string {
    return this._id;
  }

  isbnCode() {
    return this._isbnCode;
  }

  status(): OrderStatus {
    return this._status;
  }

  userId() {
    return this._userId;
  }

  orderBookCount() {
    return this._orderBookCount;
  }
}
