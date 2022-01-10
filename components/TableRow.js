import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Link from "next/link";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import {useState, useContext} from "react";
import { deleteOrder } from "../utils/crud";
import { DataContext } from "../store/globalState";
import { NOTIFY } from "../store/constants";
import Confirmation from "./Confirmation";
import Cookie from "js-cookie";

function TableRow({ order, index, setOrders }) {
  const { dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onDeleteHandler = async () => {
    setLoading(true);
    const { error, message } = await deleteOrder(
      order._id,
      Cookie.get("accessToken")
    );
    setLoading(false);
    setClicked(false);
    if (error) return dispatch({ type: NOTIFY, payload: { error: message } });
    dispatch({ type: NOTIFY, payload: { success: message } });
    setOrders(orders => orders.filter(prevOrder => prevOrder._id !== order._id));
  };

  return (
    <>
      {clicked && (
        <Confirmation
          deleteOrder={true}
          onCancel={() => {
            setClicked(false);
          }}
          onRemove={onDeleteHandler}
        />
      )}
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          {index}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="flex items-center">
            <div>
              <Link href={`/order/${order._id}`}>
                <a className="text-sm leading-5 text-gray-800 hover:underline">
                  {order._id}
                </a>
              </Link>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="text-sm leading-5 text-blue-900">
            {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          Rs.{order.total}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          {order.paid ? (
            <CheckIcon color="primary" />
          ) : (
            <ClearIcon color="secondary" />
          )}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          {order.delivered ? (
            <CheckIcon color="primary" />
          ) : (
            <ClearIcon color="secondary" />
          )}
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          {order.received ? (
            <CheckIcon color="primary" />
          ) : (
            <ClearIcon color="secondary" />
          )}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          <IconButton
            disabled={loading}
            color="primary"
            title="delete order"
            component="span"
            onClick={() => setClicked(true)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
