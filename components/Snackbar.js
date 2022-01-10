import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CustomizedSnackbars({severity="success", show= false, message, onClose=() =>{}}) {
  const [open, setOpen] = React.useState(show);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      <Snackbar open={open} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
