import { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { DataContext } from "../store/globalState";
import { AUTH, NOTIFY } from '../store/constants';
import Cookie from 'js-cookie';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function SimpleMenu({user}) {
  const { state, dispatch } = useContext(DataContext);
  const {auth} = state;
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch({ type: AUTH, payload: {} });
    Cookie.remove("accessToken");
    dispatch({ type: NOTIFY, payload: { success: 'account logged out'} });
    router.replace('/');
  }

  const AdminRoutes = () => (
    <>
      <MenuItem onClick={handleClose}>
        <div className="flex space-x-2 items-center">
          <Link href="/payments">
            <a className="menu-item text-black">Payments</a>
          </Link>
        </div>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <div className="flex space-x-2 items-center">
          <Link href="/users">
            <a className="menu-item text-black">Users</a>
          </Link>
        </div>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <div className="flex space-x-2 items-center">
          <Link href="/create">
            <a className="menu-item text-black">Products</a>
          </Link>
        </div>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <div className="flex space-x-2 items-center">
          <Link href="/categories">
            <a className="menu-item text-black">Categories</a>
          </Link>
        </div>
      </MenuItem>
    </>
  );

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        style={{
          color: "white",
        }}
      >
        <span className="menu-item text-[#fff]">
          {user ? user.fname + " " + user.lname : "Account"}
        </span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <div className="flex space-x-2 items-center">
            <Link href="/profile">
              <a className="menu-item text-black">Profile</a>
            </Link>
            <PermIdentityIcon />
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div>
            <Link href="/orders">
              <a className="menu-item text-black">Orders</a>
            </Link>
          </div>
        </MenuItem>
        {user.role === "admin" && <AdminRoutes />}
        <MenuItem onClick={logoutHandler}>
          <div className="flex space-x-2 items-center">
            <span className="menu-item text-black">Logout</span>
            <ExitToAppIcon />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
