import {useContext, useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DataContext } from "../store/globalState";
import { NOTIFY } from "../store/constants";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Confirmation({deleteUser= false, deleteProduct=false, deleteOrder= false, onCancel, onRemove, deleteCategory= false}) 
{
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  const [open, setOpen] = useState(true);

  const onRemoveHandler = async() => {
    dispatch({ type: NOTIFY, payload: { loading: true } })
    await onRemove();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {deleteUser
          ? "Are you sure you want to remove the user?"
          : deleteCategory
          ? "Are you sure you want to remove the category?"
          : deleteProduct
          ? "Are you sure you want to remove the product?"
          : deleteOrder
          ? "Are you sure you want to remove the order?"
          : null}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {deleteUser
            ? "once the user is deleted it cannot be recovered"
            : deleteCategory
            ? "once the category is deleted it cannot be recovered"
            : deleteProduct
            ? "once the product is deleted it cannot be recovered"
            : deleteOrder
            ? "once the order is deleted it cannot be recovered"
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={notify.loading || false}
          onClick={onRemoveHandler}
          color="primary"
        >
          {notify.loading ? <CircularProgress /> : "Remove"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
