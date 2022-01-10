import UserTableRow from "./UserTableRow";

function UserTable({ users, setUsers, userId }) {
  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="table-heading"></th>
              <th className="table-heading">ID</th>
              <th className="table-heading">Name</th>
              <th className="table-heading">Email</th>
              <th className="table-heading">Admin</th>
              <th className="table-heading">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users?.map((user, index) => (
              <UserTableRow
                userId={userId}
                key={user._id}
                index={index + 1}
                user={user}
                setUsers={setUsers}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
