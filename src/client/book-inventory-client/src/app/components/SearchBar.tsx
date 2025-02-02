"use client";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";

type Inputs = {
  keyword: string;
};

export function SearchBar() {
  const { handleSubmit, register } = useForm<Inputs>();

  const onSubmitHandler = (data: any) => {
    console.log(data);
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
