export class StreetAddress {
  private _streetNumber: number;
  private _blockNumber: number;

  constructor(streetNumber: number, blockNumber: number) {
    this._streetNumber = streetNumber;
    this._blockNumber = blockNumber;
  }

  streetNumber() {
    return this._streetNumber;
  }

  blockNumber() {
    return this._blockNumber;
  }
}
