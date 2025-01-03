import { Prefecture, PrefectureType } from "./Prefecture";
import { StreetAddress } from "./StreetAddress";

export class Address {
  private _prefectureCity: PrefectureType;
  private _streetAddress: StreetAddress;

  constructor(
    prefectureCity: PrefectureType,
    streetAddress: StreetAddress
  ) {
    this._prefectureCity = Prefecture.KANAGAWA_KAWASKI;
    this._streetAddress = streetAddress;
  }
}
