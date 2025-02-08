"use client";

import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import { Book } from "./types/api/BookApiTypes";
import BookIcon from "@mui/icons-material/Book";
import Divider from "@mui/material/Divider";
import { BookCardViewModel } from "./viewModel/BookCardViewModel";
import { useBooks } from "./hooks/keywordSearch";
import { LoadingWrapper } from "./components/LoadingWrapper";

export function ContentsArea() {
  const { data, isLoading } = useBooks();
  const [contents, setContents] = useState<BookCardViewModel[]>([]);

  useEffect(() => {
    setContents(data);
  }, [isLoading]);

  return (
    <div className="w-full">
      <SearchBar setContents={setContents} />
      <div className="p-2">
        <LoadingWrapper isLoading={isLoading}>
          {contents.map((book, index) => (
            <div className="pt-1" key={index}>
              <BookCard book={book} />
              <Divider />
            </div>
          ))}
        </LoadingWrapper>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: BookCardViewModel }) {
  return (
    <div className="flex gap-[20px]">
      <div className="flex-1">
        <BookIcon fontSize="large" className={"w-[120px] h-[120px]"} />
      </div>
      <div className="flex-1">
        <div className=" flex flex-col h-full">
          <div className="flex-1 text-lg">{book.title}</div>
          <div className="text-sm">{book.price()}</div>
          <div className="text-sm">{book.isbnCode}</div>
        </div>
      </div>
    </div>
  );
}
