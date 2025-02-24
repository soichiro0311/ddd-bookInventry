"use client";

import { BookCard } from "../components/BookCard";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { useBookInventory } from "../hooks/keywordSearch";
import Divider from "@mui/material/Divider";
import { InventoryCardViewModel } from "../viewModel/InventoryCardViewModel";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { InventoryCard } from "./BookInventoryCard";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { BookCardViewModel } from "../viewModel/BookCardViewModel";
import { useRouter } from "next/navigation";

export default function BookDetailContents({ isbnCode }: { isbnCode: string }) {
  const { data, isLoading, error } = useBookInventory(isbnCode);
  const [contents, setContents] = useState<BookCardViewModel[] | undefined>([]);
  const router = useRouter();

  return (
    <>
      <SearchBar
        setContents={setContents}
        onClickSearchFuncOption={() => router.push("/")}
      />
      <LoadingWrapper isLoading={isLoading}>
        {/* TODO: 検索窓 */}
        {error ? (
          <ErrorDisplay />
        ) : (
          <>
            <BookCard book={data?.bookInfo} />
            <Divider className="pt-2" />
            {data?.isSupportedOfflineStore() ? (
              <InventoryCardList inventoryInfo={data.inventoryInfo} />
            ) : (
              <NotSupportOfflineState />
            )}
          </>
        )}
      </LoadingWrapper>
    </>
  );
}

function NotSupportOfflineState() {
  return (
    <p className="flex items-center justify-center h-screen">
      現在はオフライン店舗での取り扱いはございません。オンラインでのお取り扱い店舗をお探しください。
    </p>
  );
}

function InventoryCardList({
  inventoryInfo,
}: {
  inventoryInfo: InventoryCardViewModel[];
}) {
  return (
    <div className="pt-2 flex flex-col gap-2">
      {inventoryInfo.map((inventory) => (
        <InventoryCard
          inventoryViewModel={inventory}
          key={inventory.bookStoreName}
        />
      ))}
    </div>
  );
}
