import {
  BookInventory,
  InventoryInfo,
} from "../types/api/BookInventoryApiTypes";
import { BookCardViewModel } from "./BookCardViewModel";

export class InventoryPageViewModel {
  bookInfo: BookCardViewModel;
  inventoryInfo: InventoryCardViewModel[];

  constructor(apiResponse: BookInventory) {
    this.bookInfo = new BookCardViewModel(
      apiResponse.bookInfo.title,
      apiResponse.bookInfo.isbnCode,
      apiResponse.bookInfo.price
    );
    this.inventoryInfo = apiResponse.inventoryInfo.map(
      (apiDto) => new InventoryCardViewModel(apiDto)
    );
  }

  price() {
    return this.bookInfo.price();
  }

  isSupportedOfflineStore() {
    return this.inventoryInfo != null && this.inventoryInfo.length > 0;
  }
}

export class InventoryCardViewModel {
  bookStoreName: string;
  address: string;
  inStoreInventory: number;

  constructor(apiResponse: InventoryInfo) {
    this.bookStoreName = apiResponse.bookStoreName;
    this.address = apiResponse.address;
    this.inStoreInventory = apiResponse.inStoreInventory;
  }

  isInStore() {
    return this.inStoreInventory > 0;
  }
}
