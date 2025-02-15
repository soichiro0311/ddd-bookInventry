import { Book } from "../../../app/types/api/BookApiTypes";
import { BookCardViewModel } from "../../../app/viewModel/BookCardViewModel";

export const convert = (data: Book[]) => {
  if (data == null || data.length === 0) {
    return [];
  }
  return data.map((bookResponse) => new BookCardViewModel(bookResponse));
};
