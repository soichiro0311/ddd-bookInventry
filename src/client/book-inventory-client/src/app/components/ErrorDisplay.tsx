import { useState } from "react";
import ErrorDialog from "./ErrorDialog";

export function ErrorDisplay() {
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
