import { useState, useContext } from "react";
import { DataContext } from "../../store/globalState";
import { useRouter } from "next/router";
import OrderItem from "../../components/OrderItem";
import { NOTIFY } from "../../store/constants";
import { deliverOrder, setOrderReceived } from "../../utils/crud";
import Payment from "../../components/Payment";
import axios from "../../utils/axios";
import Cookie from "js-cookie";
import { parseCookies } from "nookies";
import Error from "next/error";

function OrderDetail({ user, order: userOrder, error }) {
  if(error)
  {
    return <Error statusCode={404} />;

  }
  const [order, setOrder] = useState(userOrder);
  const {dispatch } = useContext(DataContext);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const { id } = router.query;

  const deliverOrderHandler = async () => {
    const {error, message, date} = await deliverOrder(order._id, Cookie.get("accessToken"));
    if(error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    setOrder((prev) => ({ ...prev, delivered: true, deliveredOn: date }));
    return dispatch({ type: NOTIFY, payload: { success: message } });
  };

  const receivedOrderHandler = async() => {
    const {error, message} = await setOrderReceived(
      order._id,
      Cookie.get("accessToken")
    );
    if (error)
      return dispatch({ type: NOTIFY, payload: { error: message } });
    setOrder((prev) => ({ ...prev, received: true }));
    return dispatch({ type: NOTIFY, payload: { success: message } });
  };

  return (
    <>
      {clicked && (
        <Payment
          id={id}
          total={order.total}
          onClose={() => setClicked(false)}
        />
      )}
      <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
        <button
          className="bg-gray-800 hover:bg-gray-900 ease-out text-white rounded-md px-4 py-2 text-sm tracking-wide"
          onClick={() => router.push('/orders')}
        >
          go back
        </button>
        <div className="mt-2 flex flex-col md:flex-row justify-center md:space-x-4">
          <div className="bg-white p-4 rounded-md shadow-md flex-grow">
            <h2 className="font-medium text-base sm:text-lg md:text-xl tracking-wider text-black">
              ORDER {order._id}
            </h2>
            <h3 className="font-medium text-base md:text-lg tracking-wide text-black">
              SHIPPING DETAILS
            </h3>
            <p className="order-detail">
              Name: {order?.user?.firstName + " " + order?.user?.lastName}
            </p>
            <p className="order-detail">Email: {order?.user?.email}</p>
            <p className="order-detail">Address: {order?.address}</p>
            <p className="order-detail">
              Number:{" "}
              {order?.user?.number.code.toString() +
                order?.user?.number.phoneNumber.toString()}
            </p>
            <h3 className="font-medium mt-2 text-base md:text-lg tracking-wide text-black">
              PAYMENT
            </h3>
            {order.method && (
              <h4 className="text-base font-medium md:text-lg tracking-wide text-gray-700">
                METHOD: {order.method}
              </h4>
            )}

            <div
              className={
                order.paid
                  ? "bg-green-400 text-white order-detail rounded-sm p-1 text-center my-2"
                  : "bg-red-500 text-white order-detail rounded-sm p-1 text-center my-2"
              }
            >
              {order.paid ? `PAID` : "NOT PAID"}
            </div>
            <p className="text-base font-medium md:text-lg tracking-wide text-black mt-2">
              Lugaa Delivery
            </p>
            <div
              className={
                order.delivered
                  ? "bg-green-400 text-white order-detail rounded-sm p-1 text-center my-2"
                  : "bg-red-500 text-white order-detail rounded-sm p-1 text-center my-2"
              }
            >
              {order.delivered ? (
                `DELIVERED ON ${new Date(
                  order.deliveredOn
                ).toLocaleDateString()}`
              ) : (
                <div className="flex space-x-2 justify-center items-center">
                  <span>NOT DELIVERED</span>
                  {user.role === "admin" && (
                    <button
                      onClick={deliverOrderHandler}
                      className="p-2 text-sm bg-white text-black rounded-sm hover:bg-black hover:text-white ease-out transition duration-300"
                    >
                      mark as delivered
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="text-base font-medium md:text-lg tracking-wide text-black mt-2">
              Client Order Received
            </p>
            <div
              className={
                order.received
                  ? "bg-green-400 text-white order-detail rounded-sm p-1 text-center my-2"
                  : "bg-red-500 text-white order-detail rounded-sm p-1 text-center my-2"
              }
            >
              {order.received ? (
                "RECEIVED"
              ) : (
                <div className="flex space-x-2 justify-center items-center">
                  <span>NOT RECEIVED</span>
                  {user.role !== "admin" && (
                    <button
                      onClick={receivedOrderHandler}
                      className="p-2 text-sm bg-white text-black rounded-sm hover:bg-black hover:text-white ease-out transition duration-300"
                    >
                      i have received
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="my-2">
              <h2 className="font-medium text-base md:text-lg tracking-wide text-gray-700">
                ORDER ITEMS
              </h2>
              {order?.cart?.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
            </div>
          </div>
          <div className="bg-white p-4 md:min-w-[200px] rounded-md shadow-md my-2 md:my-0">
            <h2 className="font-medium tracking-wider text-base md:text-lg lg:text-xl">
              TOTAL: Rs.{order.total}
            </h2>
            {user.role !== "admin" && !order.paid && (
              <button
                onClick={() => setClicked(true)}
                role="link"
                className="button mt-2 w-full"
              >
                Pay
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { accessToken } = parseCookies(context);
  let order = {};
  let error = true;
  try {
    const response = await axios.get(`/orders/${id}`, {
      headers: {
        Authorization: accessToken,
      },
    });
    order = response.data.order;
    error = false;
  } catch (err) {
    console.log(err.message);
  }
  return {
    props: {
      order,
      error
    },
  };
}

export default OrderDetail;
