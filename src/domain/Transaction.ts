import { v4 as uuidv4 } from "../../node_modules/uuid/dist/cjs";

export class Transaction {
  private _id: string;
  private _isbnCode: string;
  private _buyCount: number;
  private _buyDate: Date;

  private constructor(
    id: string,
    isbneCode: string,
    buyCount: number,
    buyDate: string
  ) {
    this._id = id;
    this._isbnCode = isbneCode;
    this._buyDate = new Date(buyDate);
    this._buyCount = buyCount;
  }

  static new(
    isbnCode: string,
    buyBookCount: number,
    buyDate: string
  ) {
    return new Transaction(
      uuidv4(),
      isbnCode,
      buyBookCount,
      buyDate
    );
  }

  id(): string {
    return this._id;
  }

  buyCount(): number {
    return this._buyCount;
  }

  isbnCode() {
    return this._isbnCode;
  }
}
