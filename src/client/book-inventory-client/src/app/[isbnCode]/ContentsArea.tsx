"use client";

import { BookCard } from "../components/BookCard";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { useBookInventory } from "../hooks/keywordSearch";
import Divider from "@mui/material/Divider";
import { InventoryCardViewModel } from "../viewModel/InventoryCardViewModel";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { InventoryCard } from "./BookInventoryCard";

export default function BookDetailContents({ isbnCode }: { isbnCode: string }) {
  const { data, isLoading, error } = useBookInventory(isbnCode);

  return (
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
