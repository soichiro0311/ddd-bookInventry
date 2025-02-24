import { BookInventory } from "../../../app/types/api/BookInventoryApiTypes";
import { Book } from "../../../app/types/api/BookApiTypes";
import { BookCardViewModel } from "../../../app/viewModel/BookCardViewModel";
import { InventoryPageViewModel } from "../../../app/viewModel/InventoryCardViewModel";

export const convert = (books: Book[]) => {
  if (books == null || books.length === 0) {
    return [];
  }
  return books
    .filter((bookResponse) => bookResponse != null)
    .map((bookResponse) => {
      return BookCardViewModel.fromApiResponse(bookResponse);
    });
};

export const convertInventory = (bookInventory: BookInventory) => {
  if (bookInventory == null) {
    return undefined;
  }
  return new InventoryPageViewModel(bookInventory);
};
