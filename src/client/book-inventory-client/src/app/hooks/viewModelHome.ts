import { useState } from "react";
import { BookCardViewModel } from "../viewModel/BookCardViewModel";

export function useViewModelHome() {
  const [contents, setContents] = useState<BookCardViewModel[] | undefined>([]);
  const isSearchResultExist = contents != null && contents.length > 0;

  return {
    state: {
      contents,
      isSearchResultExist,
    },
    action: {
      setContents,
    },
  };
}
