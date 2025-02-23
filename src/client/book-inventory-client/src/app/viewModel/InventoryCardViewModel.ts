import { BookInventory } from "../types/api/BookInventoryApiTypes";
import { BookCardViewModel } from "./BookCardViewModel";

export class InventoryPageViewModel {
  bookInfo: BookCardViewModel;
  inventoryInfo: InventoryCardViewModel[];

  constructor(apiResponse: BookInventory[]) {
    this.bookInfo = new BookCardViewModel(
      apiResponse[0].bookTitle,
      apiResponse[0].isbnCode,
      apiResponse[0].price
    );
    this.inventoryInfo = apiResponse.map(
      (apiDto) => new InventoryCardViewModel(apiDto)
    );
  }

  price() {
    return this.bookInfo.price();
  }
}

export class InventoryCardViewModel {
  bookStoreName: string;
  inStoreInventory: number;

  constructor(apiResponse: BookInventory) {
    this.bookStoreName = apiResponse.bookStoreName;
    this.inStoreInventory = apiResponse.inStoreInventory;
  }
}
