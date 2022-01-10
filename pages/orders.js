import Head from "next/head";
import { parseCookies } from "nookies";
import Table from "../components/Table";
import { useState } from "react";
import { getOrders } from "../utils/crud";

function orders({ orders: userOrders }) {
  const [orders, setOrders] = useState(userOrders);
  return (
    <div className="max-w-screen-2xl mx-auto py-4 px-3 md:px-6">
      <Head>
        <title>Orders</title>
      </Head>
      <Table orders={orders} setOrders={setOrders} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { accessToken } = parseCookies(context);
  const orders = await getOrders(accessToken);
  return {
    props: {
      orders,
    },
  };
}

export default orders;
