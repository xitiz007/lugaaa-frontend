import TableRow from "./TableRow";

function Table({ orders, setOrders }) {
  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="table-heading"></th>
              <th className="table-heading">ORDER ID</th>
              <th className="table-heading">DATE</th>
              <th className="table-heading">TOTAL</th>
              <th className="table-heading">PAID</th>
              <th className="table-heading">DELIVERED</th>
              <th className="table-heading">RECEIVED</th>
              <th className="table-heading">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders?.map((order, index) => (
              <TableRow
                key={order._id}
                order={order}
                index={index + 1}
                setOrders={setOrders}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
