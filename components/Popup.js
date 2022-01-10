import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Link from "next/link";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import Image from "next/image";


export default function Popup({ setShowPopup }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setShowPopup(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="p-4 flex flex-col space-y-2">
        <div className="flex items-center justify-center">
          <h3 className="text-lg flex-1 text-center md:text-xl lg:text-3xl font-medium tracking-wide">
            Lugaaa
          </h3>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <p className="text-center uppercase tracking-wider font-medium text-sm md:text-base lg:text-lg">
          be the first to know
        </p>
        <p className="text-xs md:text-sm lg:text-base text-center text-gray-500 font-normal tracking-wide">
          Sign up for Lugaaa to be the first to see inspiring content, news and
          exclusive offers.
        </p>
        <div className="relative w-full h-32 md:h-48 lg:h-52">
          <Image src="/images/lugaa.png" layout="fill" objectFit="cover" />
        </div>
        <Link href="/signup">
          <a className="text-center text-sm md:text-base lg:text-lg hover:underline font-medium tracking-wide text-blue-500">
            Create account
          </a>
        </Link>
      </div>

      <DialogActions></DialogActions>
    </Dialog>
  );
}
