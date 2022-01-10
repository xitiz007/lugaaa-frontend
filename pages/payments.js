import { useState, useContext } from "react";
import { DataContext } from "../store/globalState";
import { NOTIFY } from "../store/constants";
import Link from "next/link";
import CheckIcon from "@material-ui/icons/Check";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import {
  deletePaymentVerifyRequest,
  setOrderPaid,
  getPayments,
} from "../utils/crud";
import Cookie from "js-cookie";
import {parseCookies} from "nookies";

const RowData = ({ payment, index, dispatch, setPayments }) => {
  const [loading, setLoading] = useState(false);

  const deletePayment = async (id) => {
    setLoading(true);
    const {error, message} = await deletePaymentVerifyRequest(
      id,
      Cookie.get("accessToken")
    );
    setLoading(false);
    if (error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    setPayments((payments) =>
      payments.filter((payment) => payment._id !== id)
    );
    dispatch({ type: NOTIFY, payload: { success: message } });
  };

  const setOrderPaidHandler = async (id) => {
    setLoading(true);
    const {error, message} = await setOrderPaid(
      id,
      { method: payment.method },
      Cookie.get("accessToken")
    );
    if (error)
    {
      setLoading(false);
      return dispatch({ type: NOTIFY, payload: { error: message } });      
    }

    const response = await deletePaymentVerifyRequest(
      payment._id,
      Cookie.get("accessToken")
    );
    setLoading(false);
    if (response.error)
      return dispatch({ type: NOTIFY, payload: { error: response.message } });
    setPayments(payments => payments.filter(payment => payment._id !== payment._id));
    dispatch({ type: NOTIFY, payload: { success: 'order payment verified' } });
  };
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-black text-sm md:text-base border-gray-500">
          {index}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="flex items-center">
            <div>
              <Link href={`/order/${payment.order._id}`}>
                <a className="leading-5 text-black text-sm md:text-base hover:underline">
                  {payment.order._id}
                </a>
              </Link>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          {payment.method}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          Rs.{payment.order.total}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="flex items-center">
            <IconButton
              disabled={loading}
              color="primary"
              title="verify payment"
              component="span"
              onClick={() => setOrderPaidHandler(payment.order._id)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              disabled={loading}
              color="secondary"
              title="delete payment"
              component="span"
              onClick={() => deletePayment(payment._id)}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        </td>
      </tr>
    </>
  );
};

function Payments({ payments: userPayments }) {
  const { dispatch } = useContext(DataContext);
  const [payments, setPayments] = useState(userPayments);

  return (
    <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
      <h2 className="text-base md:text-lg lg:text-xl font-medium tracking-wide">
        Payments
      </h2>
      <div className="border-b-4 p-2"></div>
      <div className="my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="table-heading"></th>
                <th className="table-heading">ORDER ID</th>
                <th className="table-heading">Payment Method</th>
                <th className="table-heading">Total Amount</th>
                <th className="table-heading">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {payments?.map((payment, index) => (
                <RowData
                  key={payment._id}
                  index={index + 1}
                  payment={payment}
                  dispatch={dispatch}
                  setPayments={setPayments}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context)
{
  const {accessToken} = parseCookies(context);
  const payments = await getPayments(accessToken);
  return {
    props: {
      payments
    }  
  }
}

export default Payments;
