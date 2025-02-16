"use client";

import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import Divider from "@mui/material/Divider";
import { BookCardViewModel } from "./viewModel/BookCardViewModel";
import { useBooks } from "./hooks/keywordSearch";
import { LoadingWrapper } from "./components/LoadingWrapper";
import { default as cn } from "clsx";
import ErrorDialog from "./components/ErrorDialog";

export function ContentsArea() {
  const { data, isLoading, error } = useBooks();
  const [contents, setContents] = useState<BookCardViewModel[] | undefined>([]);

  useEffect(() => {
    setContents(data);
  }, [isLoading]);

  const isSearchResultExist = contents != null && contents.length > 0;

  return (
    <div className="w-full">
      <SearchBar setContents={setContents} />
      <div
        className={cn(
          isSearchResultExist
            ? "p-2"
            : "p-2 flex items-center justify-center h-screen"
        )}
      >
        <LoadingWrapper isLoading={isLoading}>
          <Contnets
            error={error}
            bookCardList={contents}
            isSearchResultExist={isSearchResultExist}
          />
        </LoadingWrapper>
      </div>
    </div>
  );
}

function Contnets({
  error,
  bookCardList,
  isSearchResultExist,
}: {
  error?: {
    status: any;
    message: string;
  };
  bookCardList?: BookCardViewModel[];
  isSearchResultExist: boolean;
}) {
  const isErrorOccurd = error != null;

  if (isErrorOccurd) {
    return <ErrorDisplay />;
  }

  if (isSearchResultExist) {
    if (bookCardList == null) {
      throw new Error();
    }
    return <BookCardList bookCardList={bookCardList} />;
  }

  return <EmptyDisplay />;
}

function EmptyDisplay() {
  return <p>対象のキーワードに該当する書籍はありませんでした。</p>;
}

function ErrorDisplay() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <p>一時的にエラーが発生したため、表示できておりません。</p>
      <ErrorDialog
        shouldOpen={open}
        onClickCloseButton={() => setOpen(false)}
      />
    </>
  );
}

function BookCardList({ bookCardList }: { bookCardList: BookCardViewModel[] }) {
  return (
    <>
      {bookCardList.map((book, index) => (
        <div className="pt-1" key={index}>
          <BookCard book={book} />
          <Divider />
        </div>
      ))}
    </>
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
