"use client";

import { BookCard } from "../components/BookCard";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { useBookInventory } from "../hooks/keywordSearch";
import Divider from "@mui/material/Divider";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { InventoryCardViewModel } from "../viewModel/InventoryCardViewModel";

export default function BookDetailContents({ isbnCode }: { isbnCode: string }) {
  const { data, isLoading, error } = useBookInventory(isbnCode);

  return (
    <LoadingWrapper isLoading={isLoading}>
      {/* TODO: 検索窓 */}
      <BookCard book={data?.bookInfo} />
      <Divider className="pt-2" />
      <div className="pt-2 flex-col gap-2">
        {data?.inventoryInfo.map((inventory) => (
          <InventoryCard
            inventoryViewModel={inventory}
            key={inventory.bookStoreName}
          />
        ))}
      </div>
    </LoadingWrapper>
  );
}

function InventoryCard({
  inventoryViewModel,
}: {
  inventoryViewModel: InventoryCardViewModel;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <div className="flex gap-2">
          <Typography level="title-md">
            {inventoryViewModel.bookStoreName}
          </Typography>
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <Typography>{inventoryViewModel.inStoreInventory}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}
