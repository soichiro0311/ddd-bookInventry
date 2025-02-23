import { BookInventory } from "@/app/types/api/BookInventoryApiTypes";
import { Book } from "../../../app/types/api/BookApiTypes";
import { BookCardViewModel } from "../../../app/viewModel/BookCardViewModel";
import { InventoryPageViewModel } from "@/app/viewModel/InventoryCardViewModel";

export const convert = (books: Book[]) => {
  if (books == null || books.length === 0) {
    return [];
  }
  return books.map((bookResponse) =>
    BookCardViewModel.fromApiResponse(bookResponse)
  );
};

export const convertInventory = (inventories: BookInventory[]) => {
  if (inventories == null || inventories.length === 0) {
    return undefined;
  }
  return new InventoryPageViewModel(inventories);
};
