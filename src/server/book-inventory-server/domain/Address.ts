import { Prefecture, prefectureBuilder, PrefectureType } from "./Prefecture";
import { StreetAddress } from "./StreetAddress";

export class Address {
  private _prefectureCity: PrefectureType;
  private _streetAddress: StreetAddress;

  constructor(prefectureCity: PrefectureType, streetAddress: StreetAddress) {
    this._prefectureCity = prefectureCity;
    this._streetAddress = streetAddress;
  }

  static new(
    prefecture: string,
    city: string,
    streetNumber: number,
    blockNumber: number
  ) {
    const prefectureCity = prefectureBuilder(prefecture, city);
    const streetAddress = new StreetAddress(streetNumber, blockNumber);
    return new Address(prefectureCity, streetAddress);
  }

  toString() {
    return `${this._prefectureCity.prefecture} ${
      this._prefectureCity.city
    } ${this._streetAddress.streetNumber()} ${this._streetAddress.blockNumber()}`;
  }
}
