"use client";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useSearchKeyword } from "../hooks/keywordSearch";
import { convert } from "../api/converter/searchKeywordConverter";

type Inputs = {
  keyword: string;
};

export function SearchBar({ setContents }: { setContents: Function }) {
  const { handleSubmit, register } = useForm<Inputs>();

  const { trigger } = useSearchKeyword();

  const onSubmitHandler = async (data: Inputs) => {
    trigger({ title: data.keyword }).then((value) => {
      setContents(convert(value));
    });
  };

  return (
    <Paper className="w-full">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full flex">
        <InputBase
          {...register("keyword")}
          sx={{ ml: 1, flex: 1 }}
          placeholder="タイトル、ISBNコード"
          inputProps={{ "aria-label": "search keyword" }}
        />
        <IconButton type="submit" sx={{ flex: 0 }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
    </Paper>
  );
}
