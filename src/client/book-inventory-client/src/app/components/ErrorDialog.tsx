import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ErrorDialog({
  shouldOpen,
  onClickCloseButton,
}: {
  shouldOpen: boolean;
  onClickCloseButton: () => void;
}) {
  return (
    <React.Fragment>
      <Dialog
        open={shouldOpen}
        onClose={onClickCloseButton}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"エラーが発生しました。"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            一時的にエラーが発生しております。再度時間置いて検索してください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickCloseButton} autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
