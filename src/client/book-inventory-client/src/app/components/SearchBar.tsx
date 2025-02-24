"use client";

import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { useSearchKeyword } from "../hooks/keywordSearch";
import { convert } from "../api/converter/searchKeywordConverter";
import { useKeywordSearchContext } from "../provider/keywordSearchProvider";

type Inputs = {
  keyword: string;
};

export function SearchBar({
  setContents,
  onClickSearchFuncOption,
}: {
  setContents: Function;
  onClickSearchFuncOption?: () => void;
}) {
  const { keyword, setKeyword } = useKeywordSearchContext();
  const { handleSubmit, register } = useForm<Inputs>({
    defaultValues: {
      keyword: keyword,
    },
  });

  const { trigger } = useSearchKeyword();

  const onSubmitHandler = async (data: Inputs) => {
    setKeyword(data.keyword);
    trigger({ title: data.keyword }).then((value) => {
      setContents(convert(value));
    });
    onClickSearchFuncOption && onClickSearchFuncOption();
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
