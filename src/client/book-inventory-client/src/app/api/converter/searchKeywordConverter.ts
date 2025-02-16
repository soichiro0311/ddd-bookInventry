import { Book } from "../../../app/types/api/BookApiTypes";
import { BookCardViewModel } from "../../../app/viewModel/BookCardViewModel";

export const convert = (books: Book[]) => {
  if (books == null || books.length === 0) {
    return [];
  }
  return books.map((bookResponse) => new BookCardViewModel(bookResponse));
};
