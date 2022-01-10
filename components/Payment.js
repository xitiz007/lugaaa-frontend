import {useState, useContext} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Image from "next/image";
import CircularProgress from "@material-ui/core/CircularProgress";
import { verifyPayment } from "../utils/crud";
import { DataContext } from "../store/globalState";
import { NOTIFY } from "../store/constants";
import Cookie from "js-cookie";

export default function Payment({ id, onClose, total }) {
  const [open, setOpen] = useState(true);
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const {dispatch} = useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const onPayHandler = async() => {
    setLoading(true);
    const {error, message} = await verifyPayment({ method, orderId: id }, Cookie.get('accessToken'));
    setLoading(false);
    if(error)  return dispatch({ type: NOTIFY, payload: {error: message} });
    dispatch({ type: NOTIFY, payload: { success: message } });
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          !loading && handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Payment Methods</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="text-xs md:text-sm">
              choose one of the payment method to get products delivered.
            </p>
            <p className="text-xs md:text-sm">
              send amount from the respective payment method app to our account
              number given
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <div className="flex flex-col space-y-4">
            <h3 className="tracking-wide font-medium text-base">
              Amount to pay: Rs.{total}
            </h3>
            <div
              className={`payment-method ${
                method === "esewa" && "bg-gray-100"
              }`}
              onClick={() => setMethod("esewa")}
            >
              <Image
                src="/images/payments/esewa.png"
                objectFit="contain"
                width={100}
                height={100}
              />
              <span className="account-number">9844984618</span>
            </div>
            <div
              className={`payment-method ${
                method === "khalti" && "bg-gray-100"
              }`}
              onClick={() => setMethod("khalti")}
            >
              <Image
                src="/images/payments/khalti.png"
                objectFit="contain"
                width={100}
                height={100}
              />
              <span className="account-number">9844984618</span>
            </div>
            <div
              className={`payment-method ${
                method === "nabil" && "bg-gray-100"
              }`}
              onClick={() => setMethod("nabil")}
            >
              <Image
                src="/images/payments/nabil.png"
                objectFit="contain"
                width={100}
                height={100}
              />
              <span className="account-number">00517822764</span>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={!method || loading} onClick={onPayHandler} color="primary" autoFocus>
            {
              loading? <CircularProgress color="primary" /> : "I have paid"
            }
          </Button>
          <Button disabled={loading} onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
