import { BookCardViewModel } from "../viewModel/BookCardViewModel";
import BookIcon from "@mui/icons-material/Book";

export function BookCard({
  book,
  onClickFunc,
}: {
  book?: BookCardViewModel;
  onClickFunc?: () => void;
}) {
  if (book == null) {
    throw new Error(`unexpected ViewData! ${book}`);
  }

  return (
    <div className="flex gap-[20px]">
      <div className="flex-1">
        <BookIcon fontSize="large" className={"w-[120px] h-[120px]"} />
      </div>
      <BookDetailInfoArea book={book} onClickFunc={onClickFunc} />
    </div>
  );
}

function BookDetailInfoArea({
  book,
  onClickFunc,
}: {
  book: BookCardViewModel;
  onClickFunc?: () => void;
}) {
  if (onClickFunc) {
    return (
      <button className="flex-1 flex" onClick={onClickFunc}>
        <div className=" flex flex-col h-full justify-start">
          <div className="flex-1 text-lg">{book.title}</div>
          <div className="text-sm">{book.price()}</div>
          <div className="text-sm">{book.isbnCode}</div>
        </div>
      </button>
    );
  } else {
    return (
      <div className="flex-1 flex" onClick={onClickFunc}>
        <div className=" flex flex-col h-full justify-start">
          <div className="flex-1 text-lg">{book.title}</div>
          <div className="text-sm">{book.price()}</div>
          <div className="text-sm">{book.isbnCode}</div>
        </div>
      </div>
    );
  }
}
