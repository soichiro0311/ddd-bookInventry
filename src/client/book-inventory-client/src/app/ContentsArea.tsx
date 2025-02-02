"use client";

import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import { Book } from "./types/api/BookApiTypes";

export function ContentsArea() {
  const [contents, setContents] = useState<Book[]>([]);

  return (
    <div className="w-full">
      <SearchBar setContents={setContents} />
      <ul className="p-2">
        {contents.map((book) => {
          return <li key={book.title}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
}
