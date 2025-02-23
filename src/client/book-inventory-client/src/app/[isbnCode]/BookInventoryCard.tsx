"use client";

import { BookCard } from "../components/BookCard";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { useBookInventory } from "../hooks/keywordSearch";
import Divider from "@mui/material/Divider";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { InventoryCardViewModel } from "../viewModel/InventoryCardViewModel";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ClearIcon from "@mui/icons-material/Clear";

export function InventoryCard({
  inventoryViewModel,
}: {
  inventoryViewModel: InventoryCardViewModel;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        <div className="flex gap-2">
          <BookStoreInfoArea inventoryViewModel={inventoryViewModel} />
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <InventoryInfoArea inventoryViewModel={inventoryViewModel} />
        </div>
      </CardContent>
    </Card>
  );
}

function BookStoreInfoArea({
  inventoryViewModel,
}: {
  inventoryViewModel: InventoryCardViewModel;
}) {
  return (
    <div className="flex-1">
      <div className="flex flex-col">
        <Typography level="title-lg">
          {inventoryViewModel.bookStoreName}
        </Typography>
        <Typography level="title-sm">{inventoryViewModel.address}</Typography>
      </div>
    </div>
  );
}

function InventoryInfoArea({
  inventoryViewModel,
}: {
  inventoryViewModel: InventoryCardViewModel;
}) {
  return (
    <div className="flex-1 flex justify-center items-center">
      {inventoryViewModel.isInStore() ? (
        <div className="flex flex-col items-center">
          <CircleOutlinedIcon className="pb-1" fontSize="large" />
          <p className="text-xs">在庫あり</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <ClearIcon />
          <p className="text-xs">在庫なし</p>
        </div>
      )}
    </div>
  );
}
