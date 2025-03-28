"use client";

import { SearchBar } from "./components/SearchBar";
import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { BookCardViewModel } from "./viewModel/BookCardViewModel";
import { useBooks, useSearchKeyword } from "./hooks/keywordSearch";
import { LoadingWrapper } from "./components/LoadingWrapper";
import { default as cn } from "clsx";
import { BookCard } from "./components/BookCard";
import { useRouter } from "next/navigation";
import { ErrorDisplay } from "./components/ErrorDisplay";

import { useKeywordSearchContext } from "./provider/keywordSearchProvider";
import { convert } from "./api/converter/searchKeywordConverter";
import { useViewModelHome } from "./hooks/viewModelHome";

export function ContentsArea() {
  const { data, isLoading, error } = useBooks();
  const {
    state: { contents, isSearchResultExist },
    action: { setContents },
  } = useViewModelHome();

  const { keyword } = useKeywordSearchContext();
  const { trigger } = useSearchKeyword();
  useEffect(() => {
    if (keyword != "") {
      trigger({ title: keyword }).then((value) => {
        setContents(convert(value));
      });
    } else {
      setContents(data);
    }
  }, [isLoading]);

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
    return <BookCardList bookCardList={bookCardList} />;
  }

  return <EmptyDisplay />;
}

function EmptyDisplay() {
  return <p>対象のキーワードに該当する書籍はありませんでした。</p>;
}

function BookCardList({
  bookCardList,
}: {
  bookCardList?: BookCardViewModel[];
}) {
  const router = useRouter();

  return (
    <>
      {bookCardList?.map((book, index) => {
        const onClickFunc = () => router.push(`/${book.isbnCode}`);
        return (
          <div className="pt-1" key={index}>
            <BookCard book={book} onClickFunc={onClickFunc} />
            <Divider />
          </div>
        );
      })}
    </>
  );
}
