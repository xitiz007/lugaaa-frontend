import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Link from "next/link";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import Confirmation from "../components/Confirmation";
import { useState, useContext } from "react";
import { deleteUser } from "../utils/crud";
import { DataContext } from "../store/globalState";
import { NOTIFY } from "../store/constants";
import Cookie from "js-cookie";

function UserTableRow({ user, index, setUsers, userId }) {
  const { dispatch } = useContext(DataContext);
  const [removeClicked, setRemoveClicked] = useState(false);
  const onCancel = () => {
    setRemoveClicked(false);
  };
  const onRemove = async () => {
    const {error, message} = await deleteUser(user._id, Cookie.get("accessToken"));
    if (error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    setUsers((users) => users.filter((prevUser) => prevUser._id !== user._id));
    return dispatch({ type: NOTIFY, payload: { success: message } });
  };
  return (
    <>
      {removeClicked && (
        <Confirmation
          deleteUser={true}
          onCancel={onCancel}
          onRemove={onRemove}
        />
      )}
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-black text-sm md:text-base border-gray-500">
          {index}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="flex items-center">
            <div>
              <Link href={`/edit_user/${user._id}`}>
                <a className="leading-5 text-black text-sm md:text-base hover:underline">
                  {user._id}
                </a>
              </Link>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-black text-sm md:text-base border-b border-gray-500">
          {user.firstName + " " + user.lastName}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-sm md:text-base text-black border-gray-500 leading-5">
          {user.email}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-sm md:text-base border-gray-500 leading-5">
          {user.role === "admin" ? (
            user.root ? (
              <div className="flex items-center justify-between bg-green-200 rounded-md p-1">
                <CheckIcon color="primary" />
                <span className="text-sm">root</span>
              </div>
            ) : (
              <CheckIcon color="primary" />
            )
          ) : (
            <ClearIcon color="secondary" />
          )}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 leading-5">
          <div className="flex items-center">
            <Link href={`/edit_user/${user._id}`}>
              <a>
                <EditIcon color="primary" />
              </a>
            </Link>
            <IconButton
              disabled={userId === user._id}
              aria-label="delete"
              onClick={() => setRemoveClicked(true)}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </div>
        </td>
      </tr>
    </>
  );
}

export default UserTableRow;
